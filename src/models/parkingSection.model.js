import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const ParkingSection = sequelize.define(
  "ParkingSection",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM("Carro", "Moto"),
      allowNull: false,
    },
    number_zones: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    number_spaces_per_zone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parkingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "parkings",
        key: "id",
      },
    },
  },
  {
    schema: "hr",
    tableName: "parking_sections",
  }
);
