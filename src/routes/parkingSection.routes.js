import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getAllParkingSectionByParking } from "../controllers/parkingSection.controller.js";

const router = Router();

router.get(
  "/parking/sections-zone-space/:id",
  authRequired,
  getAllParkingSectionByParking
);

export default router;
