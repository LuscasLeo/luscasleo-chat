import { User } from "../../../shared/types";
import { WebSocketClient } from "../socket/client";

export type UserSession = {
  client: WebSocketClient;
  user: User;
};
