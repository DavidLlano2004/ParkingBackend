import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/user.model.js";

export const seedInitUserAdmin = async () => {
  try {
    const count = await User.count();
1
    if (count === 0) {
      const passwordHash = await bcrypt.hash("admin1234", 10);

      await User.create({
        id: uuidv4(),
        email: "admin@gmail.com",
        name: "Admin User",
        cc: "1107974183",
        phone: "3122480775",
        residence_address: "Admin Address",
        rol: "Administrativo",
        password: passwordHash,
      });

      console.log("✅ Usuario administrador creado con Sequelize");
    }
  } catch (error) {
    console.error("Error al inicializar el usuario admin:", error);
  }
};
