import { Router } from "express";

import { getUpload } from "../helpers";
import { validateProduct } from "../validators";
import { ProductController } from "../controllers";
import { addUserIdToRequest } from "../middlewares";

const router = Router();
const upload = getUpload();

router.post(
  "/products",
  addUserIdToRequest,
  validateProduct(),
  upload.single("image"),
  ProductController.create
);

router.get("/products", addUserIdToRequest, ProductController.get);

router.get(
  "/products/:productId",
  addUserIdToRequest,
  ProductController.getById
);

router.delete(
  "/products/:productId",
  addUserIdToRequest,
  ProductController.delete
);

export { router as productRoute };
