import { config } from "dotenv";
import { compare, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { User, IUser } from "../models";
import { getUserIdFromToken } from "../utils";

config();

const { JWT_SECRET } = process.env;

class AuthC {
  async register(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          data: null,
          errors: errors.array(),
          message: "Wrong data for register",
        });
      }

      let { email, password } = req.body as IUser;

      const duplicateEmail = await User.findOne({ email });
      if (duplicateEmail) {
        return res
          .status(400)
          .json({ message: "Such user already exists", data: null });
      }

      const userModel = new User({
        ...req.body,
        password: await hash(password, 12),
      });

      const user = await userModel.save();

      const token = sign({ userId: user._id }, JWT_SECRET as string, {
        expiresIn: "1h",
      });

      const hour = 3600000;
      res.cookie("token", token, { maxAge: hour, httpOnly: true });

      return res.status(201).json({
        data: { token, role: user.role },
        message: "Registration is completed",
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message, data: null });
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          data: null,
          errors: errors.array(),
          message: "Wrong data for login",
        });
      }

      const { email, password } = req.body as IUser;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found", data: null });
      }

      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Incorrect password", data: null });
      }

      const token = sign({ userId: user.id }, JWT_SECRET as string, {
        expiresIn: "1h",
      });

      const hour = 3600000;
      res.cookie("token", token, { maxAge: hour, httpOnly: true });

      return res.json({
        message: "Successfully logged in",
        data: { token, role: user.role },
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message, data: null });
      }
    }
  }

  async checkAuth(req: Request, res: Response) {
    try {
      const token = req.cookies.token;
      const userId = getUserIdFromToken(token);
      const user = await User.findOne({ _id: userId });

      if (!userId || !user) {
        return res.json({
          message: "Unauthorized",
          data: null,
        });
      }

      return res.json({
        message: "Authorized",
        data: { token, role: user.role },
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message, data: null });
      }
    }
  }

  logout(req: Request, res: Response) {
    try {
      res.clearCookie("token");

      return res.json({
        message: "Successfully logged out",
        data: null,
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message, data: null });
      }
    }
  }
}

export const AuthController = new AuthC();
