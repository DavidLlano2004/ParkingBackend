import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createSpace, deleteSpace, getAllSpaces, getSpaceById, updateSpace } from "../controllers/space.controller.js";

const router = Router();

router.post("/space", authRequired, createSpace);

router.get("/spaces", authRequired, getAllSpaces);

router.get("/space/:id", authRequired, getSpaceById);

router.put("/space/:id", authRequired, updateSpace);

router.delete("/space/:id", authRequired, deleteSpace);

export default router;
