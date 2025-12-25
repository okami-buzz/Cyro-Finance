import { Snowflake } from "discord.js";

/**
 * Validators – WORLD BEST XXL
 * Fully typed, reusable, crypto + wallet + trading + alerts ready
 * Anti-crash, error safe, multi-server safe
 */

export const Validators = {
  // -------------------------
  // Discord IDs
  // -------------------------
  isDiscordId(id: string): id is Snowflake {
    const regex = /^\d{17,20}$/;
    return regex.test(id);
  },

  isChannelId(id: string): id is Snowflake {
    return this.isDiscordId(id);
  },

  isUserId(id: string): id is Snowflake {
    return this.isDiscordId(id);
  },

  // -------------------------
  // Numbers
  // -------------------------
  isPositive(value: number): boolean {
    return typeof value === "number" && !isNaN(value) && value > 0;
  },

  isPercentage(value: number): boolean {
    return this.isPositive(value) && value <= 100;
  },

  isInteger(value: number): boolean {
    return Number.isInteger(value);
  },

  // -------------------------
  // Crypto / Wallet
  // -------------------------
  isWalletAddress(address: string): boolean {
    // Ethereum/BSC/Polygon like
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  },

  isTicker(ticker: string): boolean {
    return /^[A-Z0-9]{1,10}$/.test(ticker);
  },

  isValidToken(symbol: string): boolean {
    return this.isTicker(symbol) && symbol.length <= 10;
  },

  // -------------------------
  // Strings / URLs
  // -------------------------
  isNonEmptyString(str: string): boolean {
    return typeof str === "string" && str.trim().length > 0;
  },

  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  isValidCommandName(name: string): boolean {
    return /^[a-z0-9_-]{1,32}$/.test(name);
  },

  // -------------------------
  // Cron / Jobs / Alerts
  // -------------------------
  isValidCron(cron: string): boolean {
    const regex = /^(\*|([0-5]?\d)) (\*|([01]?\d|2[0-3])) (\*|([01]?\d|2[0-9]|3[01])) (\*|([1-9]|1[0-2])) (\*|([0-6]))$/;
    return regex.test(cron);
  },

  // -------------------------
  // Trading / Market / Exchange
  // -------------------------
  isValidPrice(value: number): boolean {
    return typeof value === "number" && value > 0;
  },

  isValidOrderSide(side: string): boolean {
    return ["buy", "sell"].includes(side.toLowerCase());
  },

  isValidOrderType(type: string): boolean {
    return ["market", "limit", "stoploss", "takeprofit", "dca"].includes(type.toLowerCase());
  },

  isValidLeverage(value: number): boolean {
    return this.isInteger(value) && value >= 1 && value <= 125; // exchange max 125x
  },

  // -------------------------
  // Alerts
  // -------------------------
  isValidAlertType(type: string): boolean {
    return ["price", "percent", "volume", "whale"].includes(type.toLowerCase());
  },

  isValidAlertValue(value: number): boolean {
    return this.isPositive(value);
  },

  // -------------------------
  // Misc
  // -------------------------
  isBoolean(value: any): value is boolean {
    return typeof value === "boolean";
  },

  isArray(value: any): value is any[] {
    return Array.isArray(value);
  }
};