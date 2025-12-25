import { Client } from "discord.js";
import { logger } from "../../utils/logger";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";

/**
 * Bot Ready Event
 * Triggered when bot is fully online
 * WORLD BEST logging + embed + professional output
 */

export default {
  name: "ready",
  once: true,
  async execute(client: Client) {
    // 1️⃣ Log to console
    logger.info(`✅ Bot Logged in as ${client.user?.tag}`);

    // 2️⃣ Set presence (WORLD BEST safe)
    client.user?.setPresence({
      activities: [
        { name: "Cyro Finance | /help", type: 0 }, // Type 0 = Playing
      ],
      status: "online",
    });

    // 3️⃣ Send ready embed to console/log channel (optional)
    const readyEmbed = Embed.build({
      title: "🚀 Bot is Ready!",
      description: `Logged in as **${client.user?.tag}**\n` +
                   `Servers: ${client.guilds.cache.size}\n` +
                   `Users: ${client.users.cache.size}`,
      color: Constants.SUCCESS_COLOR,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    logger.info(JSON.stringify(readyEmbed, null, 2)); // Optional, console/log output

    // 4️⃣ Optional: Auto-register slash commands here if needed
    // await registerCommands(client);

    return;
  },
};