import { SocketCommunicationCodec } from "../../../../api/src/socket/types";
import { MessageInstance } from "../../communication/types";
import jsonCodec from "./jsonCodec";

export default <SocketCommunicationCodec<MessageInstance>>{
  decode(data) {
    return jsonCodec.decode(data) as MessageInstance;
  },
  encode(data) {
    return jsonCodec.encode(data);
  },
};
