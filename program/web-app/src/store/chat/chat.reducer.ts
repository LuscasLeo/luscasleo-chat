import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Message = {
  message: string;
  //NOT RECOMMENDED TO PUT NON-SERIALIZABLE ITEMS
  timestamp: string;
  sender: string;
};

const chat = createSlice({
  name: 'chat',
  initialState: {
    messages: [] as Message[],
  },
  reducers: {
    addMessage(
      state,
      {
        payload: { sender, message },
      }: PayloadAction<Omit<Message, 'timestamp'>>
    ) {
      state.messages.push({
        message,
        sender,
        timestamp: new Date().toLocaleTimeString(),
      });
    },
  },
});

export default chat.reducer;

export const { addMessage } = chat.actions;
