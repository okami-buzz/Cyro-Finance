import { DataTypes, Model } from "sequelize";
import { sequelize } from "../index";

/**
 * Guild Model
 * WORLD BEST for Cyro Finance
 * Stores server-specific configurations, alerts, trading settings, permissions
 */

export class Guild extends Model {
  declare id: number;
  declare guildId: string;
  declare alertsChannel: string | null;
  declare logsChannel: string | null;
  declare tradingEnabled: boolean;
  declare permissions: object; // { roleId: ["command1", "command2"] }
  declare settings: object; // any additional guild-specific settings
}

Guild.init(
  {
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
  },
  {
    tableName: "guilds",
    sequelize,
    timestamps: true,
    modelName: "Guild",
  }
);
