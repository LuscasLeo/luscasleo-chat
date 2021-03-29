import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chat/chatReducer';
import loginReducer from './login/loginReducer';

const store = configureStore({
  reducer: {
    login: loginReducer,
    chat: chatReducer,
  },
});

export type RootReducer = ReturnType<typeof store.getState>;

export default store;
