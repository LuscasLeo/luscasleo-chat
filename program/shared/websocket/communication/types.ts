import { Message, User } from "../../types";

export enum MessageHeaderTypes {
  SEND_MESSAGE,
  BROADCAST_MESSAGE,
  CHAT_HANDSHAKE,

  //CLIENT INCOMING
  MESSAGE_SENT,
}

export type SendableData = any;

export type Sendable = {
  send(data: SendableData): void;
};

export type MessagesHeader = {
  [MessageHeaderTypes.SEND_MESSAGE]: { message: string };
  [MessageHeaderTypes.BROADCAST_MESSAGE]: { message: Message };
  [MessageHeaderTypes.MESSAGE_SENT]: { message: Message };
  [MessageHeaderTypes.CHAT_HANDSHAKE]: { token: string };
};

export interface MessageInstance {
  header: MessageHeaderTypes;
  payload: any;
}

function createAction<
  T extends MessageHeaderTypes,
  V extends MessagesHeader[T]
>(header: T, payload: V) {
  return <MessageInstance>{ header, payload };
}

export type MessageReceiver<T extends Array<any> = []> = {
  [key in MessageHeaderTypes]?: (
    payload: MessagesHeader[key],
    rest?: T
  ) => void;
};

export const serverActions = {};

export const broadcastActions = {
  sendMessage(message: Message, sender?: User) {
    return createAction(MessageHeaderTypes.BROADCAST_MESSAGE, {
      message,
      sender,
    });
  },
};

export const clientActions = {
  sendMessage(message: string) {
    return createAction(MessageHeaderTypes.SEND_MESSAGE, { message });
  },

  chatHandshake(token: string) {
    return createAction(MessageHeaderTypes.CHAT_HANDSHAKE, { token });
  },
};
