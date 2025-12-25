import { EmbedBuilder, ColorResolvable } from "discord.js";

/**
 * Formatter – WORLD BEST
 * Number formatting, percentages, crypto amounts, timestamps
 * Embed builder wrapper – automatically adds footer + color scheme
 */

export class Formatter {
  // -------------------------
  // Numbers / Currency / Percent
  // -------------------------
  static formatNumber(value: number, decimals = 2): string {
    return Number(value).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  }

  static formatCurrency(value: number, symbol = "$", decimals = 2): string {
    return `${symbol}${this.formatNumber(value, decimals)}`;
  }

  static formatCrypto(value: number, symbol = "₿", decimals = 8): string {
    return `${this.formatNumber(value, decimals)} ${symbol}`;
  }

  static formatPercentage(value: number, decimals = 2): string {
    return `${this.formatNumber(value, decimals)}%`;
  }

  static formatLargeNumber(value: number): string {
    if (value >= 1e9) return this.formatNumber(value / 1e9) + "B";
    if (value >= 1e6) return this.formatNumber(value / 1e6) + "M";
    if (value >= 1e3) return this.formatNumber(value / 1e3) + "K";
    return value.toString();
  }

  static formatTimestamp(date: Date | number = Date.now(), style: 'short' | 'long' = 'short'): string {
    const d = typeof date === "number" ? new Date(date) : date;
    return style === 'short' ? d.toLocaleString() : d.toUTCString();
  }

  // -------------------------
  // Embed Builder – WORLD BEST
  // -------------------------
  static createEmbed(options: {
    title?: string;
    description?: string;
    color?: ColorResolvable;
    fields?: { name: string; value: string; inline?: boolean }[];
    timestamp?: boolean;
  }): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setColor(options.color || "#0099ff") // Default primary color
      .setTitle(options.title)
      .setDescription(options.description)
      .setTimestamp(options.timestamp ? new Date() : undefined)
      .setFooter({ text: "Made with ❤️ | By Abinash" });

    if (options.fields) {
      embed.addFields(...options.fields.map(f => ({ name: f.name, value: f.value, inline: f.inline ?? false })));
    }

    return embed;
  }

  static errorEmbed(description: string, title = "❌ Error"): EmbedBuilder {
    return this.createEmbed({ title, description, color: "#FF0000", timestamp: true });
  }

  static successEmbed(description: string, title = "✅ Success"): EmbedBuilder {
    return this.createEmbed({ title, description, color: "#00FF00", timestamp: true });
  }

  static infoEmbed(description: string, title = "ℹ️ Info"): EmbedBuilder {
    return this.createEmbed({ title, description, color: "#0099FF", timestamp: true });
  }

  static warnEmbed(description: string, title = "⚠️ Warning"): EmbedBuilder {
    return this.createEmbed({ title, description, color: "#FFA500", timestamp: true });
  }
}