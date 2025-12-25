import { CommandInteraction, Interaction } from "discord.js";
import { Embed } from "../utils/embed";

/**
 * Cooldown Handler
 * WORLD BEST per-user command cooldown (anti-spam)
 * Integrates perfectly with all bot commands
 */

const cooldowns = new Map<string, number>();
const DEFAULT_COOLDOWN = Number(process.env.COOLDOWN_MS) || 5000; // 5s default

export function applyCooldown(interaction: CommandInteraction | Interaction, duration: number = DEFAULT_COOLDOWN): boolean {
  const userId = interaction.user.id;
  const now = Date.now();

  if (cooldowns.has(userId)) {
    const expiration = cooldowns.get(userId)!;
    if (now < expiration) {
      // WORLD BEST ephemeral warning embed
      if (interaction.isCommand() || interaction.isChatInputCommand()) {
        const embed = Embed.build({
          title: "⏱ Slow Down!",
          description: `You are on cooldown. Please wait **${Math.ceil((expiration - now) / 1000)}s** before using another command.`,
          color: 0xe74c3c,
          footer: { text: "Made with ❤️ | By Abinash" },
          timestamp: true,
        });

        interaction.reply({ embeds: [embed], ephemeral: true }).catch(() => {});
      }
      return false; // Block command
    }
  }

  // Set new cooldown
  cooldowns.set(userId, now + duration);
  // Auto-remove after duration
  setTimeout(() => cooldowns.delete(userId), duration);

  return true; // Allow command
}