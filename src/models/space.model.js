// src/models/user.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Space = sequelize.define(
  "Space",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_occupied: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    zoneId: {
      type: DataTypes.UUID,
      references: {
        model: "zones",
        key: "id",
      },
      allowNull: true,
    },
  },
  {
    schema: "hr",
    tableName: "spaces",
  }
);
