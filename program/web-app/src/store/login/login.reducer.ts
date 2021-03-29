import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, AppThunk } from '..';
import { SigninResult } from '../../../../shared/types';
import {
  removeStoredToken,
  signInWithCode,
  storeToken,
  validateToken,
} from '../../services/login';

const login = createSlice({
  name: 'login',
  initialState: {
    authToken: '',
    username: '',
    isLogged: false,
    isLogging: false,
  },
  reducers: {
    setLogging(state, action: PayloadAction<boolean>) {
      state.isLogging = action.payload;
    },
    signIn(state, action: PayloadAction<SigninResult>) {
      const { username, token } = action.payload;
      state.isLogged = true;
      state.username = username;
      state.authToken = token;

      storeToken(token);
    },

    signOut(state) {
      state.authToken = '';
      state.username = '';
      state.authToken = '';
      removeStoredToken();
      state.isLogged = state.isLogging = false;
    },
  },
});

export const { signIn, signOut, setLogging } = login.actions;

export function trySignIn(code: string): AppThunk {
  return async function (dispatch: AppDispatch) {
    dispatch(setLogging(true));
    const result = await signInWithCode(code);
    dispatch(signIn(result));
    dispatch(setLogging(false));
  };
}

export function validateLogin(token: string): AppThunk {
  return async function (dispatch: AppDispatch) {
    try {
      const { username } = await validateToken(token);

      dispatch(signIn({ token, username }));
    } catch {
      dispatch(signOut());
    }
  };
}

export default login.reducer;
