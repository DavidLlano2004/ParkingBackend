import { User } from "./user.model.js";
import { Parking } from "./parking.model.js";
import { ParkingSection } from "./ParkingSection.model.js";
import { Zone } from "./zone.model.js";
import { Space } from "./space.model.js";
import { VehicleRecord } from "./vehicleRecord.model.js";

// (1:1)
User.hasOne(Parking, {
  foreignKey: "userEmployeeId",
  onDelete: "CASCADE",
  constraints: true,
});
Parking.belongsTo(User, {
  foreignKey: "userEmployeeId",
  constraints: true,
});

// (1:N)
Parking.hasMany(ParkingSection, {
  foreignKey: "parkingId",
  onDelete: "CASCADE",
});
ParkingSection.belongsTo(Parking, { foreignKey: "parkingId" });

ParkingSection.hasMany(Zone, {
  foreignKey: "parkingSectionId",
  onDelete: "CASCADE",
});
Zone.belongsTo(ParkingSection, { foreignKey: "parkingSectionId" });

Zone.hasMany(Space, { foreignKey: "zoneId", onDelete: "CASCADE" });
Space.belongsTo(Zone, { foreignKey: "zoneId" });

// 🚗 Relaciones con VehicleRecord
VehicleRecord.belongsTo(Parking, {
  foreignKey: "parkingId",
  allowNull: false,
});
Parking.hasMany(VehicleRecord, {
  foreignKey: "parkingId",
});

VehicleRecord.belongsTo(Zone, {
  foreignKey: "zoneId",
  allowNull: false,
});

Zone.hasMany(VehicleRecord, {
  foreignKey: "zoneId",
});

VehicleRecord.belongsTo(Space, {
  foreignKey: "spaceId",
  allowNull: false,
});

Space.hasMany(VehicleRecord, {
  foreignKey: "spaceId",
});

VehicleRecord.belongsTo(User, {
  foreignKey: "userId",
  allowNull: true,
});
User.hasMany(VehicleRecord, {
  foreignKey: "userId",
});

export { User, Parking, ParkingSection, Zone, Space, VehicleRecord };
