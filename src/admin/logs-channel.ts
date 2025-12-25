import { CommandInteraction, SlashCommandBuilder, ChannelType } from "discord.js";
import { Embed } from "../../utils/embed";
import { setLogsChannel, getLogsChannel } from "../../db/models/guildConfig";

/**
 * Logs Channel Command
 * Set the logs channel for the server
 * WORLD BEST embed + footer
 */

export default {
  data: new SlashCommandBuilder()
    .setName("logs-channel")
    .setDescription("Set the logs channel for this server")
    .addChannelOption(option =>
      option
        .setName("channel")
        .setDescription("Select the channel to send bot logs")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction) {
    // Check admin permissions
    if (!interaction.memberPermissions?.has("Administrator")) {
      const embed = Embed.build({
        title: "❌ Permission Denied",
        description: "You must be a server administrator to set logs channel.",
        color: 0xff0000,
        footer: { text: "Made with ❤️ | By Abinash" },
        timestamp: true,
      });
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    const channel = interaction.options.getChannel("channel", true);

    await setLogsChannel(interaction.guildId!, channel.id);

    const embed = Embed.build({
      title: "✅ Logs Channel Set",
      description: `All bot logs will now be sent to ${channel}`,
      color: 0x1abc9c,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    return interaction.reply({ embeds: [embed], ephemeral: true });
  },
};