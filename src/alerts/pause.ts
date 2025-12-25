import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { toggleAlertsPause, areAlertsPaused } from "../../db/models/alerts";

/**
 * Pause Alerts Command
 * Allows server admins to pause/resume all alerts
 * WORLD BEST embed + footer
 */

export default {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pause or resume all alerts for this server")
    .addBooleanOption(option =>
      option
        .setName("pause")
        .setDescription("True to pause, False to resume")
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction) {
    const pause = interaction.options.getBoolean("pause", true);

    await toggleAlertsPause(interaction.guildId!, pause);

    const status = pause ? "⏸ Paused" : "▶️ Resumed";

    const embed = Embed.build({
      title: `🔔 Alerts ${status} for ${interaction.guild?.name}`,
      description: `All alerts are now ${pause ? "paused" : "active"} for this server.`,
      color: pause ? 0xffa500 : 0x00ff00,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    return interaction.reply({ embeds: [embed], ephemeral: true });
  },
};