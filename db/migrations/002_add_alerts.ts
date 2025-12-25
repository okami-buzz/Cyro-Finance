import { QueryInterface, DataTypes } from "sequelize";

/**
 * Migration: Add Alerts Table
 * WORLD BEST for Cyro Finance
 * Tracks all alerts set by users per guild
 */

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable("alerts", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guildId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("price", "volume", "whale", "percent"),
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    targetValue: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
  await queryInterface.dropTable("alerts");
}