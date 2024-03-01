import { Router } from "express";

import { upload } from "@/config";
import { checkAuth } from "@/middlewares";
import { validatePost } from "@/validators";
import { PostController } from "@/controllers";

const router = Router();

router.post(
  "/users/:userId/posts",
  [upload.single("image"), ...validatePost()],
  PostController.create
);

export { router as postRoute };
