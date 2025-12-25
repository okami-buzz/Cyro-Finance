import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { addWhaleAlert, getWhaleAlerts } from "../../db/models/alerts";

/**
 * Whale Alert Command
 * Allows users to track large transactions (whales)
 * WORLD BEST embed + footer
 */

export default {
  data: new SlashCommandBuilder()
    .setName("whale")
    .setDescription("Set up alerts for large crypto transactions (whales)")
    .addNumberOption(option =>
      option
        .setName("threshold")
        .setDescription("Minimum amount to trigger alert")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("symbol")
        .setDescription("Crypto symbol to watch (e.g., BTC)")
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction) {
    const symbol = interaction.options.getString("symbol", true).toUpperCase();
    const threshold = interaction.options.getNumber("threshold", true);

    // Add whale alert to DB
    await addWhaleAlert(interaction.guildId!, interaction.user.id, symbol, threshold);

    // Fetch all current whale alerts for this server
    const alerts = await getWhaleAlerts(interaction.guildId!);
    const description = alerts
      .map(
        (a, idx) => `${idx + 1}. ${a.userTag} watches **${a.symbol}** ≥ ${a.threshold}`
      )
      .join("\n") || "No alerts set yet.";

    const embed = Embed.build({
      title: `🐋 Whale Alerts for ${interaction.guild?.name}`,
      description,
      color: 0x1e90ff,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    return interaction.reply({ embeds: [embed], ephemeral: true });
  },
};