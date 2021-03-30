import { IncomingMessage } from "http";
import { getLogger, Logger } from "log4js";
import WebSocket, { Data, EventEmitter, Server, ServerOptions } from "ws";
import { WebSocketClient } from "./client";
import { SocketCommunicationCodec } from "./types";

const logger: Logger = getLogger("socket.server.WebSocketServer");

enum EventsNames {
  MESSAGE = "MESSAGE",
  CONNECTION_OPEN = "CONNECTION_OPEN",
  CONNECTION_CLOSE = "CONNECTION_CLOSE",
}

export default class WebSocketServer<T> extends EventEmitter {
  readonly socketServer: Server;

  readonly connections: Set<WebSocketClient>;

  private codec: SocketCommunicationCodec<T>;

  constructor(socketServer: Server, codec: SocketCommunicationCodec<T>) {
    super({ captureRejections: true });
    this.codec = codec;
    this.socketServer = socketServer;
    this.connections = new Set();

    this.socketServer.on("connection", this._connectionOpen.bind(this));
  }

  private _connectionOpen(socket: WebSocket, incomingMessage: IncomingMessage) {
    const client = new WebSocketClient(socket, incomingMessage);

    if (!logger.isDebugEnabled())
      logger.info(`New connection from ${client.connectionString()}`);
    else
      logger.debug(
        `New connection from ${client.connectionString()} (${
          this.connections.size
        } connections now)`
      );

    this.connections.add(client);

    socket.on("message", (data) => this._connectionMessage(client, data));

    socket.on("close", (code, reason) =>
      this._connectionClose(client, code, reason)
    );

    this.emit(EventsNames.CONNECTION_OPEN, client, incomingMessage);
  }

  private _connectionClose(
    client: WebSocketClient,
    code: number,
    reason: string
  ): void {
    this.connections.delete(client);
    if (logger.isDebugEnabled())
      logger.debug(
        `Connection ${client.connectionString()} closed: [${code} -> '${reason}'] (${
          this.connections.size
        } connections)`
      );
    else logger.info(`Connection ${client.connectionString()} closed`);

    this.emit(EventsNames.CONNECTION_CLOSE, client, code, reason);
  }

  private _connectionMessage(client: WebSocketClient, data: Data) {
    try {
      const decoded = this.codec.decode(data);

      logger.debug(
        `Received message from ${client.connectionString()}`,
        decoded
      );

      this.emit(EventsNames.MESSAGE, client, decoded);
    } catch (err) {
      logger.error(
        "Error when decoding client message: ",
        data,
        client.connectionString(),
        err
      );
    }
  }

  public onMessage(listener: (client: WebSocketClient, message: T) => void) {
    this.on(EventsNames.MESSAGE, listener);
  }

  public onConnectionOpen(
    listener: (
      client: WebSocketClient,
      incomingMessage: IncomingMessage
    ) => void
  ) {
    this.on(EventsNames.CONNECTION_OPEN, listener);
  }

  public onConnectionClose(
    listener: (client: WebSocketClient, code: number, reason: string) => void
  ) {
    this.on(EventsNames.CONNECTION_CLOSE, listener);
  }

  send(client: WebSocketClient, data: T) {
    client.socket.send(this.codec.encode(data));
  }

  broadcast(data: T) {
    this.connections.forEach((conn) =>
      conn.socket.send(this.codec.encode(data))
    );
  }
}

export async function createServer<T>(
  options: ServerOptions,
  codec: SocketCommunicationCodec<T>
): Promise<WebSocketServer<T>> {
  return new Promise((resolve, reject) => {
    const serverCore = new Server(options, () => {
      resolve(new WebSocketServer(serverCore, codec));
    });

    serverCore.once("error", reject);
  });
}
