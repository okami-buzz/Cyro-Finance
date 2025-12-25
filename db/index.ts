import { Sequelize } from "sequelize";
import { config } from "../config";
import { User } from "./models/user";
import { Wallet } from "./models/wallet";
import { Guild } from "./models/guild";

/**
 * DB Connection
 * WORLD BEST for Cyro Finance
 * Initializes Sequelize, registers models, syncs database
 */

export const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASS,
  {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: "postgres", // Change if using MySQL or SQLite
    logging: false,      // WORLD BEST: no spam logs
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Register models
User.init(User.getAttributes(), { sequelize, modelName: "User" });
Wallet.init(Wallet.getAttributes(), { sequelize, modelName: "Wallet" });
Guild.init(Guild.getAttributes(), { sequelize, modelName: "Guild" });

// Sync database
export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("🌟 [Cyro Finance DB] Connection established successfully! Made with ❤️ | By Abinash");
    await sequelize.sync({ alter: true }); // WORLD BEST auto-sync
    console.log("🌟 [Cyro Finance DB] Models synced successfully!");
  } catch (error) {
    console.error("🔥 [Cyro Finance DB] Connection failed:", error);
  }
}