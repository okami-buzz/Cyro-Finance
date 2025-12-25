import { EmbedBuilder, ColorResolvable } from "discord.js";

/**
 * Embed – WORLD BEST
 * Reusable, multi-purpose, public bot ready
 * Automatic footer, color-coded, timestamped
 */

type EmbedField = { name: string; value: string; inline?: boolean };

interface EmbedOptions {
  title?: string;
  description?: string;
  color?: ColorResolvable;
  fields?: EmbedField[];
  timestamp?: boolean;
  authorName?: string;
  authorIconUrl?: string;
  thumbnailUrl?: string;
  imageUrl?: string;
}

export class Embed {
  private static defaultColor: ColorResolvable = "#0099FF";
  private static footerText = "Made with ❤️ | By Abinash";

  static build(options: EmbedOptions): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setColor(options.color || this.defaultColor)
      .setTitle(options.title)
      .setDescription(options.description)
      .setFooter({ text: this.footerText });

    if (options.timestamp) embed.setTimestamp(new Date());
    if (options.fields) embed.addFields(...options.fields.map(f => ({ name: f.name, value: f.value, inline: f.inline ?? false })));
    if (options.authorName) embed.setAuthor({ name: options.authorName, iconURL: options.authorIconUrl }));
    if (options.thumbnailUrl) embed.setThumbnail(options.thumbnailUrl);
    if (options.imageUrl) embed.setImage(options.imageUrl);

    return embed;
  }

  // Pre-defined types for world-class feel
  static success(description: string, title = "✅ Success"): EmbedBuilder {
    return this.build({ title, description, color: "#00FF00", timestamp: true });
  }

  static error(description: string, title = "❌ Error"): EmbedBuilder {
    return this.build({ title, description, color: "#FF0000", timestamp: true });
  }

  static info(description: string, title = "ℹ️ Info"): EmbedBuilder {
    return this.build({ title, description, color: "#0099FF", timestamp: true });
  }

  static warn(description: string, title = "⚠️ Warning"): EmbedBuilder {
    return this.build({ title, description, color: "#FFA500", timestamp: true });
  }

  static customColor(description: string, color: ColorResolvable, title = "🔹 Info"): EmbedBuilder {
    return this.build({ title, description, color, timestamp: true });
  }
}