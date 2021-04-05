import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import store, { AppDispatch, AppThunk } from '..';
import {
  clientActions,
  MessageHeaderTypes,
  MessageInstance,
  MessageReceiver,
} from '../../../../shared/websocket/communication/types';
import { getStoredToken } from '../../services/login.service';
import { getWebsocketConnectionUrl } from '../../services/websocket.service';
import { addMessage } from '../chat/chat.reducer';

const connection = {
  websocket: undefined as WebSocket | undefined,
  open: false,
};

const websocket = createSlice({
  name: 'websocket',
  initialState: {
    isConnected: false,
    isConnecting: false,
    error: null as any,
  },
  reducers: {
    setConnected(state, { payload }: PayloadAction<boolean>) {
      state.isConnected = payload;
    },

    setConnecting(state, { payload: value }: PayloadAction<boolean>) {
      state.isConnecting = value;
    },
    setError(state, { payload: error }: PayloadAction<boolean>) {
      state.error = error;
    },
  },
});

function sendData(data: any) {
  if (!connection.websocket || !connection.open)
    throw 'Websocket client instance not defined or closed';
  connection.websocket.send(JSON.stringify(data));
}

export const { setConnected, setConnecting } = websocket.actions;

export default websocket.reducer;

function createReceiver(dispatch: AppDispatch): MessageReceiver {
  return {
    [MessageHeaderTypes.BROADCAST_MESSAGE]({ message }) {
      dispatch(addMessage(message));
      console.log('message', message);
    },
  };
}

export function setUpWebSocket(): AppThunk {
  const url = getWebsocketConnectionUrl();
  return async function (dispatch: AppDispatch) {
    const receiver = createReceiver(dispatch);
    if (
      !!connection.websocket &&
      connection.websocket.readyState === connection.websocket.OPEN
    )
      throw 'Socket connection already open!';
    dispatch(setConnecting(true));
    const ws = (connection.websocket = new WebSocket(url));

    ws.addEventListener('open', () => {
      dispatch(setConnected((connection.open = true)));
      sendData(clientActions.chatHandshake(getStoredToken()!));
      dispatch(setConnecting(false));
    });

    ws.addEventListener('error', (event) => {
      dispatch(setConnecting(false));
    });

    ws.addEventListener('close', () => {
      dispatch(setConnected((connection.open = false)));
    });

    ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data) as MessageInstance;
      const listener = receiver[message.header];
      if (listener) {
        listener(message.payload);
      } else console.error(`No listener for ${message.header}`, message);
    });
  };
}

export function sendMessage(message: string) {
  sendData(clientActions.sendMessage(message));
}
