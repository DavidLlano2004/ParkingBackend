import { VehicleRecord } from "../models/vehicleRecord.model.js";
import { Space } from "../models/space.model.js";
import { v4 as uuidv4 } from "uuid";

export const registerVehicleEntry = async (req, res) => {
  const { license_plate, vehicle_type, zoneId, spaceId, userId, parkingId } =
    req.body;

  try {
    if (!license_plate || !vehicle_type || !spaceId) {
      return res.status(400).json({
        message:
          "Faltan datos obligatorios: license_plate, vehicle_type o spaceId",
      });
    }

    const space = await Space.findByPk(spaceId);
    if (!space) {
      return res.status(404).json({ message: "Espacio no encontrado" });
    }

    if (space.is_occupied) {
      return res.status(400).json({ message: "El espacio no está disponible" });
    }

    const existingRecord = await VehicleRecord.findOne({
      where: { license_plate, is_active: true },
    });

    if (existingRecord) {
      return res.status(400).json({
        message: "El vehículo ya tiene una entrada activa",
      });
    }

    const newRecord = await VehicleRecord.create({
      id: uuidv4(),
      license_plate,
      vehicle_type,
      zoneId,
      spaceId,
      userId,
      parkingId,
    });
    

    await space.update({ is_occupied: true });

    res.status(201).json({
      message: "Vehículo registrado exitosamente",
      response: newRecord,
    });
  } catch (error) {
    console.error("Error en registerVehicleEntry:", error);
    res.status(500).json({
      message: "Error al registrar el vehículo",
      error: error.message,
    });
  }
};

export const registerVehicleExit = async (req, res) => {
  const { license_plate } = req.body;

  try {
    if (!license_plate) {
      return res.status(400).json({
        message: "Se requiere la placa del vehículo (license_plate)",
      });
    }

    const record = await VehicleRecord.findOne({
      where: { license_plate, is_active: true },
    });

    if (!record) {
      return res.status(404).json({
        message: "No se encontró un registro activo para esta placa",
      });
    }

    await record.update({
      exit_time: new Date(),
      is_active: false,
    });

    const space = await Space.findByPk(record.spaceId);

    if (space) {
      await space.update({ is_occupied: false });
    }

    res.status(200).json({
      message: "Salida registrada correctamente",
      response: record,
    });
  } catch (error) {
    console.error("Error en registerVehicleExit:", error);
    res.status(500).json({
      message: "Error al registrar la salida del vehículo",
      error: error.message,
    });
  }
};

export const getAllVehicleRecords = async (req, res) => {
  const { id } = req.params;
  try {
    const records = await VehicleRecord.findAll({ where: { parkingId: id } });
    res.status(200).json({
      message: "Registros obtenidos correctamente",
      response: records,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los registros",
      error: error.message,
    });
  }
};

export const getSpaceVehicleRecordBySpaceId = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await VehicleRecord.findOne({ where: { spaceId: id } });
    const space = await Space.findByPk(id);
    if (!record) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }
    if (!space) {
      return res.status(404).json({ message: "Espacio no encontrado" });
    }

    res.status(200).json({
      message: "Registro obtenido correctamente",
      response: record,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el registro",
      error: error.message,
    });
  }
};
