import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, AppThunk } from '..';

const connection = {
  websocket: undefined as WebSocket | undefined,
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

export const { setConnectionOpen } = websocket.actions;

export function setUpWebSocket(url: string): AppThunk {
  return async function (dispatch: AppDispatch) {
    if (
      !!connection.websocket &&
      connection.websocket.readyState === connection.websocket.OPEN
    )
      throw 'Socket connection already open!';

    const ws = (connection.websocket = new WebSocket(url));

    ws.addEventListener('open', () => {
      dispatch(setConnectionOpen(true));
    });
    ws.addEventListener('close', () => {
      dispatch(setConnectionOpen(false));
    });

    ws.addEventListener('message', (event) => {
      console.log(event.data);
    });
  };
}

export function sendMessage(data: any) {
  connection.websocket?.send(data);
}

export default websocket.reducer;
