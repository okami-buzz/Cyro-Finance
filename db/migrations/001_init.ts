import { QueryInterface, DataTypes } from "sequelize";

/**
 * Migration: Initial Setup
 * WORLD BEST for Cyro Finance
 * Creates essential tables: users, wallets, guilds
 */

export async function up(queryInterface: QueryInterface) {
  // Users table
  await queryInterface.createTable("users", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    discordId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    walletConnected: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    premium: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    settings: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    cooldowns: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  });

  // Wallets table
  await queryInterface.createTable("wallets", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    tokens: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    nfts: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    history: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  });

  // Guilds table
  await queryInterface.createTable("guilds", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    guildId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    alertsChannel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    logsChannel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tradingEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    permissions: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    settings: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable("guilds");
  await queryInterface.dropTable("wallets");
  await queryInterface.dropTable("users");
        }
