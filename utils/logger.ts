/**
 * Logger – WORLD BEST
 * Multi-purpose, color-coded, timestamped
 * Public bot + multi-server friendly
 * Error / Info / Debug / Success logs
 */

import chalk from "chalk";

// ANSI Colors for console
const colors = {
  info: chalk.blueBright,
  warn: chalk.yellowBright,
  error: chalk.redBright,
  success: chalk.greenBright,
  debug: chalk.magentaBright,
};

export class Logger {
  private static timestamp(): string {
    return new Date().toISOString();
  }

  static info(message: string, context?: string) {
    console.log(
      colors.info(`[INFO | ${Logger.timestamp()}${context ? " | " + context : ""}]`) +
        ` ${message}`
    );
  }

  static warn(message: string, context?: string) {
    console.warn(
      colors.warn(`[WARN | ${Logger.timestamp()}${context ? " | " + context : ""}]`) +
        ` ${message}`
    );
  }

  static error(message: string | Error, context?: string) {
    let msg = typeof message === "string" ? message : message.stack || message.message;
    console.error(
      colors.error(`[ERROR | ${Logger.timestamp()}${context ? " | " + context : ""}]`) +
        ` ${msg}`
    );
  }

  static success(message: string, context?: string) {
    console.log(
      colors.success(`[SUCCESS | ${Logger.timestamp()}${context ? " | " + context : ""}]`) +
        ` ${message}`
    );
  }

  static debug(message: string, context?: string) {
    console.log(
      colors.debug(`[DEBUG | ${Logger.timestamp()}${context ? " | " + context : ""}]`) +
        ` ${message}`
    );
  }

  // Optional: Server-specific logs
  static guildLog(message: string, guildId: string, level: "info" | "warn" | "error" | "success" | "debug" = "info") {
    const context = `Guild: ${guildId}`;
    switch (level) {
      case "info":
        Logger.info(message, context);
        break;
      case "warn":
        Logger.warn(message, context);
        break;
      case "error":
        Logger.error(message, context);
        break;
      case "success":
        Logger.success(message, context);
        break;
      case "debug":
        Logger.debug(message, context);
        break;
    }
  }
}

// Example Usage:
// Logger.info("Bot started");
// Logger.warn("Rate-limit warning", "Trading");
// Logger.error(new Error("Failed to fetch price"));
// Logger.success("Trade executed", "BTC/USDT");
// Logger.debug("Raw API response", "Binance");
// Logger.guildLog("Server alerts initialized", "123456789012345678", "success");