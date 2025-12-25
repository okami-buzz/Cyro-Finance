import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { addPercentAlert, getPercentAlerts } from "../../db/models/alerts";

/**
 * Percent Alert Command
 * Allows users to track price changes in crypto by percent
 * WORLD BEST embed + footer
 */

export default {
  data: new SlashCommandBuilder()
    .setName("percent")
    .setDescription("Set up alerts for crypto price change percentage")
    .addStringOption(option =>
      option
        .setName("symbol")
        .setDescription("Crypto symbol to watch (e.g., BTC)")
        .setRequired(true)
    )
    .addNumberOption(option =>
      option
        .setName("percent")
        .setDescription("Price change percentage to trigger alert")
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction) {
    const symbol = interaction.options.getString("symbol", true).toUpperCase();
    const percent = interaction.options.getNumber("percent", true);

    // Add percent alert to DB
    await addPercentAlert(interaction.guildId!, interaction.user.id, symbol, percent);

    // Fetch all current percent alerts for this server
    const alerts = await getPercentAlerts(interaction.guildId!);
    const description = alerts
      .map(
        (a, idx) => `${idx + 1}. ${a.userTag} watches **${a.symbol}** ≥ ${a.percent}%`
      )
      .join("\n") || "No alerts set yet.";

    const embed = Embed.build({
      title: `📈 Percent Alerts for ${interaction.guild?.name}`,
      description,
      color: 0x1abc9c,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    return interaction.reply({ embeds: [embed], ephemeral: true });
  },
};