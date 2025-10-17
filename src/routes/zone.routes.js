import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createZone, deleteZone, getAllZones, getZoneById, updateZone } from "../controllers/zone.controller.js";

const router = Router();

router.post("/zone", authRequired, createZone);

router.get("/zones", authRequired, getAllZones);

router.get("/zone/:id", authRequired, getZoneById);

router.put("/zone/:id", authRequired, updateZone);

router.delete("/zone/:id", authRequired, deleteZone);

export default router;
