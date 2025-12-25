import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { client } from "../../bot/client";

/**
 * Ping Command
 * Shows bot latency (ping)
 * WORLD BEST embed + footer
 */

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check bot latency"),

  async execute(interaction: CommandInteraction) {
    const latency = Math.round(client.ws.ping);

    const embed = Embed.build({
      title: "🏓 Pong!",
      description: `Bot latency is **${latency}ms**`,
      color: 0x2ecc71,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    return interaction.reply({ embeds: [embed], ephemeral: true });
  },
};