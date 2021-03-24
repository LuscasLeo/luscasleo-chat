import { SocketCommunicationCodec } from "../types";

export default <SocketCommunicationCodec<Object>>{
  decode(data) {
    return JSON.parse(String(data));
  },

  encode(data) {
    return JSON.stringify(data);
  },
};
