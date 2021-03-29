import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import chatReducer from './chat/chat.reducer';
import loginReducer from './login/login.reducer';
import websocketReducer from './websocket/websocket.reducer';

const store = configureStore({
  reducer: {
    login: loginReducer,
    chat: chatReducer,
    websocket: websocketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<String>>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
