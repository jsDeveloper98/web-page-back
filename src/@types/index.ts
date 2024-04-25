import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface IJWTUser extends JwtPayload {
  userId: string;
}

export interface IRequest extends Request {
  user?: {
    userId: string;
  };
}
