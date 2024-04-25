import { config } from "dotenv";
import { Request, Response, NextFunction } from "express";

import { IRequest } from "../@types";
import { getUserIdFromToken } from "../utils";

config();

export const addUserIdToRequest = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const userId = getUserIdFromToken(req.cookies.token);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized", data: null });
    }

    req.user = { userId };
    next();
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).json({ message: err.message, data: null });
    }
  }
};
