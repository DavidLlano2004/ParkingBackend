// src/models/user.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Parking = sequelize.define(
  "Parking",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("name", value.trim());
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userEmployeeId: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: true,
    },
  },
  {
    schema: "hr",
    tableName: "parkings",
  }
);
