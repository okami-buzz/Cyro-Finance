import { Client, Guild } from "discord.js";
import { logger } from "../../utils/logger";
import { Embed } from "../../utils/embed";
import { removeGuildConfig } from "../../guild/guildConfig";

/**
 * Guild Delete Event
 * Triggered when bot leaves or is removed from a server
 * WORLD BEST logging + embed
 */

export default {
  name: "guildDelete",
  async execute(guild: Guild, client: Client) {
    // 1️⃣ Remove guild config from DB/cache
    await removeGuildConfig(guild.id);

    // 2️⃣ Log deletion
    logger.info(`❌ Left guild: ${guild.name} (${guild.id})`);

    // 3️⃣ Optional embed logging for internal log channel
    const embed = Embed.build({
      title: "⚠️ Bot Removed from Server",
      description: `Left **${guild.name}**\nID: \`${guild.id}\`\nMembers: ${guild.memberCount}`,
      color: 0xff0000,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    // Example: log to console or to a developer channel
    logger.info(JSON.stringify(embed, null, 2));
  },
};