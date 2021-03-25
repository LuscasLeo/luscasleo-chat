import jwt from "jsonwebtoken";

const { JWT_SECRET = "secret" } = process.env;

export const crypt = (payload: string | object | Buffer) =>
  jwt.sign(payload, JWT_SECRET);

export const decode = <T extends any>(token: string) =>
  jwt.verify(token, JWT_SECRET) as T;
