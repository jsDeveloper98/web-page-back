import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { Post } from "@/models";

class PostC {
  async create(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          data: null,
          errors: errors.array(),
          message: "Invalid Data",
        });
      }

      // TODO: HOVO continue from here
      console.log("%c req.file ===>", "color: #90ee90", req.file);
      console.log("%c req.files ===>", "color: #90ee90", req.files);
      // console.log("%c req ===>", "color: #90ee90", req);

      // const image = req.files.map((file) => ({
      //   path: file.path,
      //   filename: file.filename,
      //   url: `uploads/${file.filename}`,
      // }));

      const postModel = new Post({
        ...req.body,
      });

      const post = await postModel.save();

      res.status(201).json({
        data: { ...post },
        message: "Created",
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message, data: null });
      }
    }
  }
}

export const PostController = new PostC();
