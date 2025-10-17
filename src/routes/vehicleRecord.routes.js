import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getAllVehicleRecords,
  getSpaceVehicleRecordBySpaceId,
  registerVehicleEntry,
  registerVehicleExit,
} from "../controllers/vehicleRecord.controller.js";

const router = Router();

router.post("/vehicle-record/entry", authRequired, registerVehicleEntry);

router.post("/vehicle-record/exit", authRequired, registerVehicleExit);

router.get("/vehicle-records/:id", authRequired, getAllVehicleRecords);

router.get("/vehicle-record/:id", authRequired, getSpaceVehicleRecordBySpaceId);

export default router;
