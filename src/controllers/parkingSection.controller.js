import { ParkingSection } from "../models/ParkingSection.model.js";
import { Zone } from "../models/zone.model.js";
import { Space } from "../models/space.model.js";

export const getAllParkingSectionByParking = async (req, res) => {
  const { id } = req.params;

  try {
    const records = await ParkingSection.findAll({
      where: { parkingId: id },
      include: [
        {
          model: Zone,
          attributes: ["id", "name" , "parkingSectionId"],
          include: [
            {
              model: Space,
              attributes: ["id", "code", "is_occupied" , "zoneId"],
            },
          ],
        },
      ],
      order: [
        ["id", "ASC"],
        [Zone, "name", "ASC"],
        [Zone, Space, "code", "ASC"],
      ],
    });

    res.status(200).json({
      message: "Secciones, zonas y espacios obtenidos correctamente",
      response: records,
    });
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    res.status(500).json({
      message: "Error al obtener las secciones con zonas y espacios",
      error: error.message,
    });
  }
};
