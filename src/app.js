import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import parkingRoutes from "./routes/parking.routes.js";
import userRoutes from "./routes/user.routes.js";
import parkingSectionRoutes from "./routes/parkingSection.routes.js";
import zoneRoutes from "./routes/zone.routes.js";
import spaceRoutes from "./routes/space.routes.js";
import vehicleRecordRoutes from "./routes/vehicleRecord.routes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(morgan("dev"));

app.use(express.json());

app.use(cookieParser());

app.use(
  "/api",
  authRoutes,
  parkingRoutes,
  userRoutes,
  parkingSectionRoutes,
  zoneRoutes,
  spaceRoutes,
  vehicleRecordRoutes
);

export default app;
