import { config } from "dotenv";
import { verify } from "jsonwebtoken";

import { IJWTUser } from "../@types";

config();

const { JWT_SECRET } = process.env;

export const getUserIdFromToken = (token: string) => {
  if (!token) {
    return null;
  }

  const decoded = verify(token, JWT_SECRET as string) as IJWTUser;

  if (decoded.exp && decoded.exp <= Date.now() / 1000) {
    return null;
  }

  return decoded.userId;
};
