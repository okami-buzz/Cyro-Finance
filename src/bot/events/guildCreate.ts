import { Client, Guild } from "discord.js";
import { logger } from "../../utils/logger";
import { Embed } from "../../utils/embed";
import { initGuildConfig } from "../../guild/guildConfig";

/**
 * Guild Create Event
 * Triggered when bot joins a new server
 * WORLD BEST logging + embed + setup hint
 */

export default {
  name: "guildCreate",
  async execute(guild: Guild, client: Client) {
    // 1️⃣ Initialize guild configuration in DB/cache
    await initGuildConfig(guild.id);

    // 2️⃣ Log join
    logger.info(`✅ Joined new guild: ${guild.name} (${guild.id}) with ${guild.memberCount} members`);

    // 3️⃣ Optional embed for internal log channel
    const embed = Embed.build({
      title: "🎉 Bot Joined New Server",
      description: `Joined **${guild.name}**\nID: \`${guild.id}\`\nMembers: ${guild.memberCount}\n` +
                   `Use \`/setup\` to configure alerts, trading, and channels!`,
      color: 0x00ff00,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    // Example: log to console or developer channel
    logger.info(JSON.stringify(embed, null, 2));
  },
};
