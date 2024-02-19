import { config } from "dotenv";
import { sign } from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { User, IUser } from "../models";

config();

const { JWT_SECRET } = process.env;

class AuthC {
  async register(req: Request, res: Response) {
    console.log("%c req ===>", "color: #90ee90", req);
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
        expiresIn: "7d",
      });

      res.status(201).json({
        data: { token, userId: user.id },
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
        expiresIn: "7d",
      });

      res.json({
        message: "Successfully logged in",
        data: { token, userId: user.id },
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message, data: null });
      }
    }
  }
}

export const AuthController = new AuthC();
