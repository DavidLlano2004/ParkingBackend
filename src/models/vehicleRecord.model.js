import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const VehicleRecord = sequelize.define(
  "VehicleRecord",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    license_plate: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    vehicle_type: {
      type: DataTypes.ENUM("Carro", "Moto"),
      allowNull: false,
    },
    entry_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    exit_time: {
      type: DataTypes.DATE,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    parkingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "parkings",
        key: "id",
      },
    },
    zoneId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "zones",
        key: "id",
      },
    },
    spaceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "spaces",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    schema: "hr",
    tableName: "vehicle_records",
    timestamps: true,
  }
);
