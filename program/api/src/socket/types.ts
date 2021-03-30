import { Data } from "ws";

export interface SocketCommunicationCodec<T> {
  encode(data: T): Data | never;
  decode(data: Data): T | never;
}
