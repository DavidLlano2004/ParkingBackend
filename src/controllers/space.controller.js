import { ParkingSection } from "../models/ParkingSection.model.js";
import { Space } from "../models/space.model.js";
import { VehicleRecord } from "../models/vehicleRecord.model.js";
import { Zone } from "../models/zone.model.js";
import { v4 as uuidv4 } from "uuid";

export const createSpace = async (req, res) => {
  const { zoneId } = req.body;
  const id = uuidv4();

  try {
    const zone = await Zone.findByPk(zoneId);
    if (!zone) {
      return res.status(404).json({
        message: "La zona especificada no existe",
      });
    }

    const existingSpaces = await Space.findAll({
      where: { zoneId },
      order: [["createdAt", "ASC"]],
    });

    const zoneLetter = zone.name.split(" ")[1] || "X";

    const nextNumber = existingSpaces.length + 1;

    const code = `${zoneLetter}${nextNumber}`;

    const newSpace = await Space.create({
      id,
      code,
      is_occupied: false,
      zoneId,
    });

    return res.status(201).json({
      message: "Espacio creado correctamente",
      response: newSpace,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear el espacio",
      error: error.message,
    });
  }
};

export const updateSpace = async (req, res) => {
  const { id } = req.params;
  try {
    const space = await Space.findByPk(id);

    if (!space) {
      return res.status(404).json({ message: "Espacio no encontrado" });
    }

    await space.update(req.body);

    res.status(200).json({
      message: "Espacio actualizado correctamente",
      response: space,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el espacio",
      error: error.message,
    });
  }
};

export const deleteSpace = async (req, res) => {
  const { id } = req.params;

  try {
    const space = await Space.findByPk(id);

    if (!space) {
      return res.status(404).json({
        message: "Espacio no encontrado",
      });
    }

    await space.destroy();

    return res.status(200).json({
      message: "Espacio eliminado correctamente",
      response: space,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar el espacio",
      error: error.message,
    });
  }
};

export const getAllSpaces = async (req, res) => {
  const { zoneId } = req.params;

  try {
    const space = await Space.findAll({
      where: { zoneId: zoneId },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "Espacios obtenidos correctamente",
      response: space,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener los espacios",
      error: error.message,
    });
  }
};

export const getSpaceById = async (req, res) => {
  const { id } = req.params;

  try {
    const space = await Space.findByPk(id, {
      include: {
        model: Zone,
        attributes: ["id", "name"],
        include: {
          model: ParkingSection,
          attributes: ["id", "type"],
        },
      },
    });

    if (!space) {
      return res.status(404).json({
        message: "Espacio no encontrado",
      });
    }

    const plainSpace = space.get({ plain: true });

    const recordVehicle = await VehicleRecord.findOne({
      where: { spaceId: space.id, is_active: true },
    });

    const newData = {
      ...plainSpace,
      recordVehicle: recordVehicle ? recordVehicle.get({ plain: true }) : null,
    };

    return res.status(200).json({
      message: "Espacio obtenido correctamente",
      response: newData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener el espacio",
      error: error.message,
    });
  }
};
