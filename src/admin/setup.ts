import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { initGuildConfig } from "../../db/models/guildConfig";

/**
 * Setup Command
 * First-time setup for the server
 * WORLD BEST embed + footer
 */

export default {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Initialize server settings for Cyro Finance bot"),

  async execute(interaction: CommandInteraction) {
    // Check admin permissions
    if (!interaction.memberPermissions?.has("Administrator")) {
      const embed = Embed.build({
        title: "❌ Permission Denied",
        description: "You must be a server administrator to run setup.",
        color: 0xff0000,
        footer: { text: "Made with ❤️ | By Abinash" },
        timestamp: true,
      });
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    // Initialize server config in DB
    await initGuildConfig(interaction.guildId!);

    const embed = Embed.build({
      title: "✅ Server Setup Complete",
      description:
        "Cyro Finance is now ready!\n\n• Alerts system enabled\n• Trading features initialized\n• Default logs and channels configured",
      color: 0x1abc9c,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    return interaction.reply({ embeds: [embed], ephemeral: true });
  },
};