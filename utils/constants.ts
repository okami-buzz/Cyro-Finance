import { ColorResolvable } from "discord.js";

/**
 * Constants – WORLD BEST
 * Centralized constants for Cyro Finance
 * Multi-purpose, public bot ready, type-safe
 */

export const Constants = {
  // -------------------------
  // General
  // -------------------------
  FOOTER_TEXT: "Made with ❤️ | By Abinash",
  DEFAULT_COLOR: "#0099FF",
  SUCCESS_COLOR: "#00FF00",
  ERROR_COLOR: "#FF0000",
  INFO_COLOR: "#0099FF",
  WARNING_COLOR: "#FFA500",

  // -------------------------
  // Discord Commands
  // -------------------------
  COMMAND_CATEGORIES: {
    SYSTEM: "System",
    ADMIN: "Admin",
    MARKET: "Market",
    ALERTS: "Alerts",
    WALLET: "Wallet",
    TRADE: "Trade",
    DEFI: "DeFi",
    ONCHAIN: "OnChain",
    NEWS: "News",
    PREMIUM: "Premium",
  } as const,

  // -------------------------
  // Trading
  // -------------------------
  ORDER_SIDES: ["buy", "sell"] as const,
  ORDER_TYPES: ["market", "limit", "stoploss", "takeprofit", "dca"] as const,
  MAX_LEVERAGE: 125,

  // -------------------------
  // Alerts
  // -------------------------
  ALERT_TYPES: ["price", "percent", "volume", "whale"] as const,

  // -------------------------
  // Wallet / Blockchain
  // -------------------------
  SUPPORTED_CHAINS: ["ETH", "BSC", "POLYGON"] as const,
  WC_RELAY: "wss://relay.walletconnect.com",

  // -------------------------
  // Other
  // -------------------------
  COOLDOWN_MS: 5000,
} as const;

// Types for strong typing
export type CommandCategory = (typeof Constants.COMMAND_CATEGORIES)[keyof typeof Constants.COMMAND_CATEGORIES];
export type OrderSide = (typeof Constants.ORDER_SIDES)[number];
export type OrderType = (typeof Constants.ORDER_TYPES)[number];
export type AlertType = (typeof Constants.ALERT_TYPES)[number];
export type SupportedChain = (typeof Constants.SUPPORTED_CHAINS)[number];
export type EmbedColor = ColorResolvable;
