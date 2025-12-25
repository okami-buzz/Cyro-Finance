import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { client } from "../../bot/client";

/**
 * Status Command
 * Shows bot uptime, latency, server count
 * WORLD BEST embed + footer
 */

export default {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Check the current status of the bot"),

  async execute(interaction: CommandInteraction) {
    const uptime = Math.floor(client.uptime! / 1000);
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = uptime % 60;

    const embed = Embed.build({
      title: "📊 Bot Status",
      description: `
**Uptime:** ${days}d ${hours}h ${minutes}m ${seconds}s
**Latency:** ${client.ws.ping}ms
**Servers:** ${client.guilds.cache.size}
      `,
      color: 0x3498db,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    return interaction.reply({ embeds: [embed], ephemeral: true });
  },
};