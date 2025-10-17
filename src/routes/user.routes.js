import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/users", authRequired, getAllUsers);

router.get("/user/:id", authRequired, getUserById);

router.put("/user/:id", authRequired, updateUser);

router.delete("/user/:id", authRequired, deleteUser);

export default router;
