import { getLogger } from "log4js";
import {
  MessageHeaderTypes,
  MessageInstance,
  MessageReceiver,
  broadcastActions,
} from "../../../shared/websocket/communication/types";
import WebSocketServer from "../socket/server";
import { Message, User } from "../../../shared/types";
import { WebSocketClient } from "../socket/client";
import { decode } from "../encryption/jwt";
import { UserSession } from "./types";

const logger = getLogger("Chat Manager Instance");
export default class ChatRoom {
  messages: Message[];
  server: WebSocketServer<MessageInstance>;
  socketReceiver: MessageReceiver<[WebSocketClient]>;
  usersReceiver: MessageReceiver<[User]>;

  sessions: Map<string, UserSession>;
  sessionsByClient: Map<WebSocketClient, UserSession>;

  constructor(server: WebSocketServer<MessageInstance>) {
    this.messages = [];
    this.server = server;
    this.sessions = new Map();
    this.sessionsByClient = new Map();

    this.initializeReceivers();

    server.onConnectionClose((client) => {
      const session = this.sessionsByClient.get(client);
      if (!session) {
        logger.warn("No session for " + client.connectionString());
        return;
      }

      this.sessionsByClient.delete(client);
      this.sessions.delete(session.user.username);

      logger.debug(`[ON CLOSE] USER ${session.user.username} LOGGED OUT`);
    });

    server.onMessage((client, message) => {
      const socketReceiver = this.socketReceiver[message.header];
      const userReceiver = this.usersReceiver[message.header];

      const session = this.sessionsByClient.get(client);

      if (socketReceiver) {
        this.socketReceiver[message.header](message.payload, [client]);
      }

      if (session && userReceiver) {
        this.usersReceiver[message.header](message.payload, [session.user]);
      }
    });
  }

  initializeReceivers() {
    const self = this;
    this.socketReceiver = {
      async [MessageHeaderTypes.CHAT_HANDSHAKE]({ token }, [client]) {
        try {
          const decoded = decode<{ username: string }>(token);
          const { username } = decoded;

          const user = { username };

          if (self.sessions.has(username)) {
            const outerSession = self.sessions.get(username);
            outerSession.client.socket.close();
            self.sessionsByClient.delete(outerSession.client);
            self.sessions.delete(username);
          }

          const session: UserSession = {
            user,
            client,
          };

          self.sessions.set(username, session);
          self.sessionsByClient.set(client, session);
        } catch {
          client.socket.close();
        }
      },
    };

    this.usersReceiver = {
      [MessageHeaderTypes.SEND_MESSAGE]({ message }, [user]) {
        self.server.broadcast(
          broadcastActions.sendMessage({
            sender: user.username,
            timestamp: Date.now(),
            value: message,
          })
        );
      },
    };
  }
}
