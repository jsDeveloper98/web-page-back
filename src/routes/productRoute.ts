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

router.delete(
  "/products/:productId",
  addUserIdToRequest,
  ProductController.delete
);

router.get("/my-products", addUserIdToRequest, ProductController.getMyProducts);

export { router as productRoute };
