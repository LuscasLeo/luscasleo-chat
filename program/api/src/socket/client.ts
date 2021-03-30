import { IncomingMessage } from "http";
import WebSocket from "ws";

export class WebSocketClient {
  readonly socket: WebSocket;
  readonly incomingMessage: IncomingMessage;

  constructor(socket: WebSocket, incomingMessage: IncomingMessage) {
    this.socket = socket;
    this.incomingMessage = incomingMessage;
  }

  connectionString() {
    return `${this.incomingMessage.socket.remoteAddress}:${this.incomingMessage.socket.remotePort}`;
  }
}
