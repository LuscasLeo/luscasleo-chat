import axios from 'axios';
import { SigninResult, SigninValidateResult } from '../../../shared/types';

const TOKEN_NAME = 'token';

const api = axios.create({ baseURL: 'http://localhost:3000' });

export async function signInWithCode(code: string) {
  try {
    const response = await api.get(`/signin/github/${encodeURI(code)}`);

    return response.data as SigninResult;
  } catch (err) {
    console.log('err: ', err);
    throw null;
  }
}

export async function validateToken(token: string) {
  try {
    const response = await api.post(`/sign/validate`, {
      token,
    });

    return response.data as SigninValidateResult;
  } catch {
    throw false;
  }
}

export function storeToken(token: string) {
  localStorage.setItem(TOKEN_NAME, token);
}

export const getStoredToken = () => localStorage.getItem(TOKEN_NAME);

export const removeStoredToken = () => localStorage.removeItem(TOKEN_NAME);

export async function isAvailableUsername(username: string) {
  await new Promise((rs) => setTimeout(rs, 3000));

  return !['luscasleo', '-system'].includes(username.toLowerCase());
}
