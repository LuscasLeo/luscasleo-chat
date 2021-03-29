export interface User {
  username: string;
}

export interface SigninResult {
  token: string;
  username: string;
}

export interface SigninValidateResult {
  username: string;
}
