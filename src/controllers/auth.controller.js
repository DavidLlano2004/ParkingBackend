import { QueryTypes } from "sequelize";
import { TOKEN_SECRET } from "../config.js";
import { sequelize } from "../db.js";
import { createAccesToken } from "../libs/jwt.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/user.model.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ where: { email } });

    if (!userFound) {
      return res.status(400).json({ message: "Credenciales inválidas." });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales inválidas." });
    }

    const token = await createAccesToken({ id: userFound.id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    const { password: _, ...userData } = userFound.toJSON();

    return res.status(200).json({
      message: "Usuario autenticado",
      response: userData,
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const register = async (req, res) => {
  const { name, email, password, cc, rol, residence_address } = req.body;
  const id = uuidv4();

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Ya existe un usuario con este correo electrónico",
      });
    }
    const newUser = await User.create({
      id,
      name,
      email,
      password,
      cc,
      rol,
      residence_address,
      password: passwordHash,
    });

    const responseUser= {
      id: newUser.id,
      name: newUser.name,
      fullName: newUser.fullName,
      phone: newUser.phone,
      address: newUser.address,
      userName: newUser.userName,
      birthday: newUser.birthday,
      createdAt: newUser.createdAt,
    };

    return res.status(201).json({
      message: "Usuario creado correctamente",
      response: responseUser,
    }); 
  } catch (error) {
    console.error("Error en register:", error);

    return res.status(500).json({
      message: "Error al crear el suario",
      error: error.message,
    });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    const [userFound] = await sequelize.query(
      `
      SELECT *
      FROM users
      WHERE id = :id
      `,
      {
        replacements: { id: user.id },
        type: QueryTypes.SELECT,
      }
    );
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.status(200).json({
      message: "User found",
      response: userFound,
    });
  });
};
