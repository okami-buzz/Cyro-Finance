import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { addAlert, getAlerts } from "../../db/models/alerts";

/**
 * Create Alert Command
 * Allows users to create alerts (whale, percent, volume, etc.)
 * WORLD BEST embed + footer
 */

export default {
  data: new SlashCommandBuilder()
    .setName("create")
    .setDescription("Create a new alert")
    .addStringOption(option =>
      option
        .setName("type")
        .setDescription("Type of alert (whale, percent, volume)")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("symbol")
        .setDescription("Crypto symbol to watch (e.g., BTC)")
        .setRequired(true)
    )
    .addNumberOption(option =>
      option
        .setName("value")
        .setDescription("Threshold value for alert (e.g., amount or percent)")
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction) {
    const type = interaction.options.getString("type", true).toLowerCase();
    const symbol = interaction.options.getString("symbol", true).toUpperCase();
    const value = interaction.options.getNumber("value", true);

    // Add alert to DB
    await addAlert(interaction.guildId!, interaction.user.id, type, symbol, value);

    const alerts = await getAlerts(interaction.guildId!);
    const description = alerts
      .map(
        (a, idx) =>
          `${idx + 1}. **${a.userTag}** watches **${a.symbol}** (${a.type}) ≥ ${a.value}`
      )
      .join("\n") || "No alerts set yet.";

    const embed = Embed.build({
      title: `✅ Alert Created`,
      description,
      color: 0x2ecc71,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    return interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
