import WebSocketServer from "../socket/server";
import { Message } from "./types";

export default class ChatRoom {
  messages: Message[];
  server: WebSocketServer<string>;

  constructor(server: WebSocketServer<string>) {
    this.messages = [];
    this.server = server;

    server.onMessage((client, message) => {
      this.messages.push({
        value: message,
        timestamp: Date.now(),
        from: client.connectionString(),
      });

      this.server.broadcast(`${client.connectionString()}: ${message}`);
    });
  }
}
