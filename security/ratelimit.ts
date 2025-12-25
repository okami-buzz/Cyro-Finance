import { CommandInteraction, Interaction } from "discord.js";

/**
 * RateLimit Guard
 * Prevents users from spamming commands
 * WORLD BEST anti-spam logic
 */

const cooldowns = new Map<string, number>();
const COOLDOWN_MS = Number(process.env.COOLDOWN_MS) || 5000; // Default 5s

export function checkRateLimit(interaction: CommandInteraction | Interaction): boolean {
  const userId = interaction.user.id;
  const now = Date.now();

  if (cooldowns.has(userId)) {
    const expiration = cooldowns.get(userId)!;
    if (now < expiration) {
      // WORLD BEST ephemeral warning embed
      if (interaction.isCommand() || interaction.isChatInputCommand()) {
        interaction.reply({
          content: `⏱ Please wait **${Math.ceil((expiration - now)/1000)}s** before using another command.`,
          ephemeral: true,
        }).catch(() => {});
      }
      return true; // Block command
    }
  }

  cooldowns.set(userId, now + COOLDOWN_MS);
  // Auto clean cooldown after expiry
  setTimeout(() => cooldowns.delete(userId), COOLDOWN_MS);

  return false; // Allow command
}