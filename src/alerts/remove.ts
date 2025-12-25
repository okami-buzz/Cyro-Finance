import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { removeAlert, getAlerts } from "../../db/models/alerts";

/**
 * Remove Alert Command
 * Allows users to remove their alerts (whale, volume, percent, etc.)
 * WORLD BEST embed + footer
 */

export default {
  data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("Remove an existing alert")
    .addStringOption(option =>
      option
        .setName("alert_id")
        .setDescription("ID of the alert to remove")
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction) {
    const alertId = interaction.options.getString("alert_id", true);

    // Remove alert from DB
    const success = await removeAlert(interaction.guildId!, interaction.user.id, alertId);

    const alerts = await getAlerts(interaction.guildId!);
    const description = alerts
      .map((a, idx) => `${idx + 1}. ${a.userTag} watches **${a.symbol}**`)
      .join("\n") || "No alerts set yet.";

    const embed = Embed.build({
      title: success ? "✅ Alert Removed" : "❌ Failed to Remove Alert",
      description,
      color: success ? 0x00ff00 : 0xff0000,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    return interaction.reply({ embeds: [embed], ephemeral: true });
  },
};