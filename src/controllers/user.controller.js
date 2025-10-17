import { User } from "../models/user.model.js";

export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await user.update(req.body);

    res.status(200).json({
      message: "Usuario actualizado correctamente",
      response: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el usuario",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    await user.destroy();

    return res.status(200).json({
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar el usuario",
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "Usuarios obtenidos correctamente",
      response: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener los usuarios",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      message: "Usuario obtenido correctamente",
      response: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener el usuario",
      error: error.message,
    });
  }
};
