import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import store, { AppDispatch, AppThunk } from '..';
import {
  clientActions,
  MessageHeaderTypes,
  MessageInstance,
  MessageReceiver,
} from '../../../../shared/websocket/communication/types';
import { getStoredToken } from '../../services/login';
import { addMessage } from '../chat/chat.reducer';

const connection = {
  websocket: undefined as WebSocket | undefined,
  open: false,
};

const websocket = createSlice({
  name: 'websocket',
  initialState: {
    isOpen: false,
  },
  reducers: {
    setConnectionOpen(state, { payload }: PayloadAction<boolean>) {
      state.isOpen = payload;
    },
  },
});

function sendData(data: any) {
  if (!connection.websocket || !connection.open)
    throw 'Websocket client instance not defined or closed';
  connection.websocket.send(JSON.stringify(data));
}

export const { setConnectionOpen } = websocket.actions;

export default websocket.reducer;

function createReceiver(dispatch: AppDispatch): MessageReceiver {
  return {
    [MessageHeaderTypes.BROADCAST_MESSAGE]({ message }) {
      dispatch(addMessage(message));
      console.log('message', message);
    },
  };
}

export function setUpWebSocket(url: string): AppThunk {
  return async function (dispatch: AppDispatch) {
    const receiver = createReceiver(dispatch);
    if (
      !!connection.websocket &&
      connection.websocket.readyState === connection.websocket.OPEN
    )
      throw 'Socket connection already open!';

    const ws = (connection.websocket = new WebSocket(url));

    ws.addEventListener('open', () => {
      dispatch(setConnectionOpen((connection.open = true)));
      sendData(clientActions.chatHandshake(getStoredToken()!));
    });
    ws.addEventListener('close', () => {
      dispatch(setConnectionOpen((connection.open = false)));
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
