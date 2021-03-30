export interface User {
  username: string;
}

export interface Message {
  timestamp: number;
  value: string;
  sender: string;
}

export interface SigninResult {
  token: string;
  username: string;
}

export interface SigninValidateResult {
  username: string;
}
