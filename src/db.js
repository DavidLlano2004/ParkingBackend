// src/db.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  "parking_app", //Nombre base de datos
  "postgres", // Usuario
  "admin1234",
  {
    host: "localhost",
    dialect: "postgres",
    port: 5432,
  }
);
