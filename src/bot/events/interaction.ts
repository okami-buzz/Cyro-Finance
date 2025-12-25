import { Client, Interaction } from "discord.js";
import { logger } from "../../utils/logger";
import { Embed } from "../../utils/embed";
import { CommandHandler } from "../../bot/register";
import { guard } from "../../security/guard";

/**
 * Interaction Create Event
 * Handles slash commands with WORLD BEST safety and embeds
 */

export default {
  name: "interactionCreate",
  async execute(interaction: Interaction, client: Client) {
    if (!interaction.isChatInputCommand()) return;

    const command = CommandHandler.get(interaction.commandName);
    if (!command) {
      return interaction.reply({
        embeds: [Embed.error("❌ Unknown command!")],
        ephemeral: true,
      });
    }

    try {
      // 1️⃣ Check if command requires wallet or server setup
      const canExecute = await guard(interaction);
      if (!canExecute) return; // guard handles reply

      // 2️⃣ Execute command
      await command.execute(interaction, client);

      // 3️⃣ Log execution (WORLD BEST)
      logger.info(
        `✅ Command /${interaction.commandName} executed by ${interaction.user.tag} in ${interaction.guild?.name}`
      );
    } catch (error) {
      logger.error(`❌ Error executing /${interaction.commandName}: ${error}`);
      return interaction.reply({
        embeds: [Embed.error("❌ An error occurred while executing this command!")],
        ephemeral: true,
      });
    }
  },
};