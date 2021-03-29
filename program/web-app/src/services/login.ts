import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000' });

export async function signIn(code: string) {
  try {
    const response = await api.get(`/signin/github/${encodeURI(code)}`);

    console.log(response);
    return response.data;
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

    return response;
  } catch {
    throw false;
  }
}

export function isLoggedIn() {
  // return !!localStorage();
}
