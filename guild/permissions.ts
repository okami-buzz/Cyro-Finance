import { CommandInteraction, Interaction } from "discord.js";
import { Embed } from "../utils/embed";
import { getGuildConfig } from "./guildConfig";

/**
 * Permissions Guard
 * WORLD BEST per-server command permission management
 */

export async function checkPermission(interaction: CommandInteraction | Interaction, commandName: string): Promise<boolean> {
  const guildId = interaction.guildId;
  if (!guildId) return true; // DM safe

  const guildConfig = await getGuildConfig(guildId);
  const allowedCommands = guildConfig.allowedCommands || [];

  if (!allowedCommands.includes(commandName)) {
    // WORLD BEST embed warning
    const embed = Embed.build({
      title: "⛔ Permission Denied",
      description: `You do not have permission to use the command \`${commandName}\` in this server.`,
      color: 0xe74c3c,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    if (interaction.isCommand() || interaction.isChatInputCommand()) {
      await interaction.reply({ embeds: [embed], ephemeral: true }).catch(() => {});
    }

    return false; // Block command
  }

  return true; // Allow command
}