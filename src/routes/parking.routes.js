import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  createParking,
  deleteParking,
  getAllParkings,
  getParkingById,
  updateParking,
} from "../controllers/parking.controller.js";

const router = Router();

router.post("/parking", authRequired, createParking);

router.get("/parkings", authRequired, getAllParkings);

router.get("/parking/:id", authRequired, getParkingById);

router.put("/parking/:id", authRequired, updateParking);

router.delete("/parking/:id", authRequired, deleteParking);

export default router;
