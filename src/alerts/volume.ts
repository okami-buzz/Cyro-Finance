import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { addVolumeAlert, getVolumeAlerts } from "../../db/models/alerts";

/**
 * Volume Alert Command
 * Allows users to track large volume changes in crypto
 * WORLD BEST embed + footer
 */

export default {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Set up alerts for high trading volume changes")
    .addStringOption(option =>
      option
        .setName("symbol")
        .setDescription("Crypto symbol to watch (e.g., BTC)")
        .setRequired(true)
    )
    .addNumberOption(option =>
      option
        .setName("percent")
        .setDescription("Volume change percentage to trigger alert")
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction) {
    const symbol = interaction.options.getString("symbol", true).toUpperCase();
    const percent = interaction.options.getNumber("percent", true);

    // Add volume alert to DB
    await addVolumeAlert(interaction.guildId!, interaction.user.id, symbol, percent);

    // Fetch all current volume alerts for this server
    const alerts = await getVolumeAlerts(interaction.guildId!);
    const description = alerts
      .map(
        (a, idx) => `${idx + 1}. ${a.userTag} watches **${a.symbol}** ≥ ${a.percent}% volume change`
      )
      .join("\n") || "No alerts set yet.";

    const embed = Embed.build({
      title: `📊 Volume Alerts for ${interaction.guild?.name}`,
      description,
      color: 0xffa500,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    return interaction.reply({ embeds: [embed], ephemeral: true });
  },
};