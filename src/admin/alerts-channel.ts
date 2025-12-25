import { CommandInteraction, SlashCommandBuilder, ChannelType } from "discord.js";
import { Embed } from "../../utils/embed";
import { setAlertsChannel, getAlertsChannel } from "../../db/models/guildConfig";

/**
 * Alerts Channel Command
 * Set the alerts channel for the server
 * WORLD BEST embed + footer
 */

export default {
  data: new SlashCommandBuilder()
    .setName("alerts-channel")
    .setDescription("Set the alerts channel for this server")
    .addChannelOption(option =>
      option
        .setName("channel")
        .setDescription("Select the channel to send alerts")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction) {
    // Check admin permissions
    if (!interaction.memberPermissions?.has("Administrator")) {
      const embed = Embed.build({
        title: "❌ Permission Denied",
        description: "You must be a server administrator to set alerts channel.",
        color: 0xff0000,
        footer: { text: "Made with ❤️ | By Abinash" },
        timestamp: true,
      });
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    const channel = interaction.options.getChannel("channel", true);

    await setAlertsChannel(interaction.guildId!, channel.id);

    const embed = Embed.build({
      title: "✅ Alerts Channel Set",
      description: `All price & crypto alerts will now be sent to ${channel}`,
      color: 0x1abc9c,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    return interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
