import { Zone } from "../models/zone.model.js";
import { v4 as uuidv4 } from "uuid";

export const createZone = async (req, res) => {
  const { parkingSectionId } = req.body;
  const id = uuidv4();

  try {
    const existingZones = await Zone.findAll({
      where: { parkingSectionId },
      order: [["createdAt", "ASC"]],
    });

    const nextLetter = String.fromCharCode(65 + existingZones.length);

    const name = `Zona ${nextLetter}`;

    const newZone = await Zone.create({
      id,
      name,
      parkingSectionId,
    });

    return res.status(201).json({
      message: `Zona creada correctamente (${name})`,
      response: newZone,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear la zona",
      error: error.message,
    });
  }
};

export const updateZone = async (req, res) => {
  const { id } = req.params;
  try {
    const zone = await Zone.findByPk(id);

    if (!zone) {
      return res.status(404).json({ message: "Zona no encontrado" });
    }

    await zone.update(req.body);

    res.status(200).json({
      message: "Zona actualizado correctamente",
      response: zone,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la zona",
      error: error.message,
    });
  }
};

export const deleteZone = async (req, res) => {
  const { id } = req.params;

  try {
    const zone = await Zone.findByPk(id);

    if (!zone) {
      return res.status(404).json({
        message: "Zona no encontrado",
      });
    }

    await zone.destroy();

    return res.status(200).json({
      message: "Zona eliminada correctamente",
      response: zone
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar la zona",
      error: error.message,
    });
  }
};

export const getAllZones = async (req, res) => {
  const { sectionId } = req.params;

  try {
    const zone = await Zone.findAll({
      where: { parkingSectionId: sectionId },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "Zonas obtenidas correctamente",
      response: zone,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener las zonas",
      error: error.message,
    });
  }
};

export const getZoneById = async (req, res) => {
  const { id } = req.params;

  try {
    const zone = await Zone.findByPk(id);

    if (!zone) {
      return res.status(404).json({
        message: "Zona no encontrada",
      });
    }

    return res.status(200).json({
      message: "Zonas obtenidas correctamente",
      response: zone,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener la zona",
      error: error.message,
    });
  }
};
