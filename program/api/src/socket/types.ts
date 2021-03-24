import { IncomingMessage } from "http";
import WebSocket, { Data } from "ws";

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

export interface SocketCommunicationCodec<T> {
  encode(data: T): Data | never;
  decode(data: Data): T | never;
}
