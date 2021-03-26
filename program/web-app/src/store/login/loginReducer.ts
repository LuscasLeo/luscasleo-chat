import { createSlice } from '@reduxjs/toolkit';

const login = createSlice({
  name: 'login',
  initialState: {
    authToken: '',
  },
  reducers: {
    test(state) {
      state.authToken = 'hello World!';
    },
  },
});

export const { test } = login.actions;

export default login.reducer;
