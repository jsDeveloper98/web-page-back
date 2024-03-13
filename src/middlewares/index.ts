import { config } from "dotenv";
import { JwtPayload, verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

config();

const { JWT_SECRET } = process.env;

// TODO: change the logic here to handle cookies
export const checkAuth = (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No authorization" });
    }

    req.user = verify(token, JWT_SECRET as string) as JwtPayload;

    if (req.user.exp && req.user.exp <= Date.now() / 1000) {
      return res.status(401).json({ message: "Authorization token expired" });
    }

    next();
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).json({ message: err.message });
    }
  }
};
