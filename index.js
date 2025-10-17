// index.js
import app from "./src/app.js";
import { sequelize } from "./src/db.js";
import {
  User,
  Parking,
  ParkingSection,
  Zone,
  Space,
  VehicleRecord
} from "./src/models/index.js"; // asegúrate de exportarlos en ese archivo
import { seedInitUserAdmin } from "./src/seeds/auth.seed.js";

async function main() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base de datos");

    // Sincroniza en orden correcto para evitar errores de FK
    await User.sync({ alter: true });
    await Parking.sync({ alter: true });
    await ParkingSection.sync({ alter: true });
    await Zone.sync({ alter: true });
    await Space.sync({ alter: true });
    await VehicleRecord.sync({ alter: true });

    console.log("🔄 Modelos sincronizados correctamente");

    await seedInitUserAdmin();

    app.listen(3000, () => {
      console.log("🚀 Servidor corriendo en el puerto 3000");
    });
  } catch (error) {
    console.error("❌ Error al iniciar la app:", error);
  }
}

main();
