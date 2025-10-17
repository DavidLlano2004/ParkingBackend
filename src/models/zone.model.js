// src/models/user.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Zone = sequelize.define(
  "Zone",
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
    parkingSectionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "parking_sections",
        key: "id",
      },
    },
  },
  {
    schema: "hr",
    tableName: "zones",
  }
);
