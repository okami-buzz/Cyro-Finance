import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { getAlerts } from "../../db/models/alerts";

/**
 * List Alerts Command
 * Displays all active alerts in the server
 * WORLD BEST embed + footer
 */

export default {
  data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("List all active alerts in this server"),

  async execute(interaction: CommandInteraction) {
    const alerts = await getAlerts(interaction.guildId!);

    const description =
      alerts.length > 0
        ? alerts
            .map(
              (a, idx) =>
                `${idx + 1}. **${a.userTag}** watches **${a.symbol}** ${
                  a.type ? `(${a.type})` : ""
                } ≥ ${a.value}`
            )
            .join("\n")
        : "No alerts set yet.";

    const embed = Embed.build({
      title: `📋 Active Alerts for ${interaction.guild?.name}`,
      description,
      color: 0x3498db,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    return interaction.reply({ embeds: [embed], ephemeral: true });
  },
};