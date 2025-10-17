import { Parking } from "../models/parking.model.js";
import { Zone } from "../models/zone.model.js";
import { Space } from "../models/space.model.js";
import { ParkingSection } from "../models/ParkingSection.model.js";
import { User } from "../models/user.model.js";

export const createParking = async (req, res) => {
  const { name, phone, address, userEmployeeId, sections } = req.body;

  try {
    const parking = await Parking.create({
      name,
      phone,
      address,
      userEmployeeId,
    });

    for (const section of sections) {
      const newSection = await ParkingSection.create({
        type: section.type,
        number_zones: section.number_zones,
        number_spaces_per_zone: section.number_spaces_per_zone,
        parkingId: parking.id,
      });

      for (let i = 0; i < section.number_zones; i++) {
        const zoneLetter = String.fromCharCode(65 + i);

        const zone = await Zone.create({
          name: `Zona ${zoneLetter}`,
          parkingSectionId: newSection.id,
        });

        for (let j = 1; j <= section.number_spaces_per_zone; j++) {
          await Space.create({
            code: `${zoneLetter}${j}`,
            zoneId: zone.id,
            is_occupied: false,
          });
        }
      }
    }

    const parkingEnd = await Parking.findByPk(parking.id, {
      include: {
        model: User,
        attributes: ["id", "name", "rol"],
      },
    });

    res.status(201).json({
      message: "Parqueadero creado con éxito",
      response: parkingEnd,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el parqueadero",
      error: error.message,
    });
  }
};

export const updateParking = async (req, res) => {
  const { id } = req.params;

  try {
    const parking = await Parking.findByPk(id, {
      include: {
        model: User,
        attributes: ["id", "name", "rol"],
      },
    });
    if (!parking) {
      return res.status(404).json({ message: "Parqueadero no encontrado" });
    }

    await parking.update(req.body);

    res.status(200).json({
      message: "Parqueadero actualizado correctamente",
      response: parking,
    });
  } catch (error) {
    console.error("Error en updateParking:", error);
    res.status(500).json({
      message: "Error al actualizar el parqueadero",
      error: error.message,
    });
  }
};

export const deleteParking = async (req, res) => {
  const { id } = req.params;

  try {
    const parking = await Parking.findByPk(id);

    if (!parking) {
      return res.status(404).json({
        message: "Parqueadero no encontrado",
      });
    }

    await parking.destroy();

    return res.status(200).json({
      message: "Parqueadero eliminado correctamente",
    });
  } catch (error) {
    console.error("Error en deleteParking:", error);
    return res.status(500).json({
      message: "Error al eliminar el parqueadero",
      error: error.message,
    });
  }
};

export const getAllParkings = async (req, res) => {
  try {
    const parkings = await Parking.findAll({
      order: [["createdAt", "DESC"]],
      include: {
        model: User,
        attributes: ["id", "name", "rol"],
      },
    });

    return res.status(200).json({
      message: "Parqueaderos obtenidos correctamente",
      response: parkings,
    });
  } catch (error) {
    console.error("Error en getAllParkings:", error);
    return res.status(500).json({
      message: "Error al obtener los parqueaderos",
      error: error.message,
    });
  }
};

export const getParkingById = async (req, res) => {
  const { id } = req.params;

  try {
    const parking = await Parking.findByPk(id);

    if (!parking) {
      return res.status(404).json({
        message: "Parqueadero no encontrado",
      });
    }

    return res.status(200).json({
      message: "Parqueadero obtenido correctamente",
      response: parking,
    });
  } catch (error) {
    console.error("Error en getParkingById:", error);
    return res.status(500).json({
      message: "Error al obtener el parqueadero",
      error: error.message,
    });
  }
};
