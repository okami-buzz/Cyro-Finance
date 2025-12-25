import { CommandInteraction, SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { Embed } from "../../utils/embed";
import { setCommandPermission, getCommandPermissions } from "../../db/models/guildConfig";

/**
 * Permissions Command
 * Manage custom command permissions for server
 * WORLD BEST embed + footer
 */

export default {
  data: new SlashCommandBuilder()
    .setName("permissions")
    .setDescription("Manage custom command permissions for this server")
    .addStringOption(option =>
      option
        .setName("command")
        .setDescription("Command to set permissions for")
        .setRequired(true)
    )
    .addBooleanOption(option =>
      option
        .setName("allow")
        .setDescription("True to allow, False to deny for everyone except admins")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction: CommandInteraction) {
    const command = interaction.options.getString("command", true).toLowerCase();
    const allow = interaction.options.getBoolean("allow", true);

    await setCommandPermission(interaction.guildId!, command, allow);

    const permissions = await getCommandPermissions(interaction.guildId!);
    const description =
      permissions.length > 0
        ? permissions
            .map((p, idx) => `${idx + 1}. **${p.command}** → ${p.allowed ? "✅ Allowed" : "❌ Denied"}`)
            .join("\n")
        : "No custom permissions set.";

    const embed = Embed.build({
      title: "🔒 Command Permissions Updated",
      description,
      color: allow ? 0x00ff00 : 0xff0000,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    return interaction.reply({ embeds: [embed], ephemeral: true });
  },
};