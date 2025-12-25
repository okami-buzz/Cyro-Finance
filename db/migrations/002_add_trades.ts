import { QueryInterface, DataTypes } from "sequelize";

/**
 * Migration: Add Trades Table
 * WORLD BEST for Cyro Finance
 * Tracks all user trades (buy/sell, market/limit, symbol, quantity, price, status)
 */

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable("trades", {
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
    exchange: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    side: {
      type: DataTypes.ENUM("buy", "sell"),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("market", "limit"),
      allowNull: false,
      defaultValue: "market",
    },
    quantity: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("open", "filled", "cancelled"),
      allowNull: false,
      defaultValue: "open",
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
  await queryInterface.dropTable("trades");
}