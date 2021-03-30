import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../../../../shared/types';

const chat = createSlice({
  name: 'chat',
  initialState: {
    messages: [] as Message[],
  },
  reducers: {
    addMessage(state, { payload }: PayloadAction<Message>) {
      state.messages.push(payload);
    },
  },
});

export default chat.reducer;

export const { addMessage } = chat.actions;
