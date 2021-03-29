import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import chatReducer from './chat/chatReducer';
import loginReducer from './login/loginReducer';

const store = configureStore({
  reducer: {
    login: loginReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<String>>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
