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

const logger = getLogger("Chat Manager Instance");
export default class ChatRoom {
  messages: Message[];
  server: WebSocketServer<MessageInstance>;
  socketReceiver: MessageReceiver<[WebSocketClient]>;
  usersReceiver: MessageReceiver<[User]>;

  users: Map<WebSocketClient, User>;

  constructor(server: WebSocketServer<MessageInstance>) {
    this.messages = [];
    this.server = server;
    this.users = new Map();

    this.initializeReceivers();

    server.onMessage((client, message) => {
      const socketReceiver = this.socketReceiver[message.header];
      const userReceiver = this.usersReceiver[message.header];

      const user = this.users.get(client);

      if (socketReceiver) {
        this.socketReceiver[message.header](message.payload, [client]);
      }

      if (user && userReceiver) {
        this.usersReceiver[message.header](message.payload, [user]);
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

          logger.debug(`Chat handshake token decoded: `, decoded);

          self.users.set(client, { username });
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
