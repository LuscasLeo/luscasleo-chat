import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Message = {
  message: string;
  //NOT RECOMMENDED TO PUT NON-SERIALIZABLE ITEMS
  timestamp: Date;
  username: string;
};

const chat = createSlice({
  name: 'chat',
  initialState: {
    messages: [] as Message[],
  },
  reducers: {
    addMessage(state, action: PayloadAction<string>) {
      state.messages.push({
        message: action.payload,
        username: 'Lucas',
        timestamp: new Date(),
      });
    },
  },
});

export default chat.reducer;

export const { addMessage } = chat.actions;
