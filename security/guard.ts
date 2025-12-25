import { CommandInteraction, Interaction } from "discord.js";
import { Embed } from "../utils/embed";
import { getUserWallet } from "../crypto/walletConnect";

/**
 * Guard Middleware
 * Ensures wallet is connected before allowing trade/exchange commands
 * WORLD BEST embed + footer
 */

export async function guard(interaction: CommandInteraction | Interaction): Promise<boolean> {
  const userId = interaction.user.id;

  // Fetch connected wallet for user
  const wallet = await getUserWallet(userId);

  if (!wallet) {
    // WORLD BEST warning embed
    const embed = Embed.build({
      title: "⛔ Wallet Not Connected",
      description: "You need to connect your wallet before using trade or exchange commands.\nUse `/wallet connect` to get started.",
      color: 0xe74c3c,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    if (interaction.isCommand() || interaction.isChatInputCommand()) {
      await interaction.reply({ embeds: [embed], ephemeral: true });
    }

    return false; // Block command
  }

  return true; // Allow command
}