import { Router } from "express";

import { AuthController } from "../controllers";
import { validateLogin, validateRegister } from "../validators";

const router = Router();

router.get("/auth/logout", AuthController.logout);
router.get("/auth/check", AuthController.checkAuth);
router.post("/auth/login", validateLogin(), AuthController.login);
router.post("/auth/register", validateRegister(), AuthController.register);

export { router as authRoute };
