import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { setTradingStatus, getTradingStatus } from "../../db/models/guildConfig";

/**
 * Trading Toggle Command
 * Allows server admins to enable or disable trading features
 * WORLD BEST embed + footer
 */

export default {
  data: new SlashCommandBuilder()
    .setName("trading-toggle")
    .setDescription("Enable or disable trading for this server")
    .addBooleanOption(option =>
      option
        .setName("enable")
        .setDescription("True to enable trading, False to disable")
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction) {
    // Check admin permissions
    if (!interaction.memberPermissions?.has("Administrator")) {
      const embed = Embed.build({
        title: "❌ Permission Denied",
        description: "You must be a server administrator to use this command.",
        color: 0xff0000,
        footer: { text: "Made with ❤️ | By Abinash" },
        timestamp: true,
      });
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    const enable = interaction.options.getBoolean("enable", true);

    await setTradingStatus(interaction.guildId!, enable);

    const status = enable ? "✅ Trading Enabled" : "⛔ Trading Disabled";

    const embed = Embed.build({
      title: status,
      description: `Trading features are now ${enable ? "active" : "inactive"} on this server.`,
      color: enable ? 0x00ff00 : 0xff0000,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    return interaction.reply({ embeds: [embed], ephemeral: true });
  },
};