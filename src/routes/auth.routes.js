// src/routes/auth.routes.js
import { Router } from "express";

import { validateSchema } from "../middlewares/validator.middleware.js";
import { login } from "../controllers/auth.controller.js";
import { loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/login", validateSchema(loginSchema), login);

export default router;
