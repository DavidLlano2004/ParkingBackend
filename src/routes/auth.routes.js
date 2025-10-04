import { Router } from "express";

import { validateSchema } from "../middlewares/validator.middleware.js";
import { login, logout, register, verifyToken } from "../controllers/auth.controller.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/login", validateSchema(loginSchema), login);

router.post("/register", validateSchema(registerSchema), register);

router.post("/logout", logout);

router.get("/verify", verifyToken);



export default router;
