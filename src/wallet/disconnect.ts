import { CommandInteraction } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { disconnectWallet } from "../../crypto/walletConnect";

/**
 * Wallet Disconnect Command
 * Disconnect user wallet safely
 * Embed + Footer + World-Best formatting
 */

export default {
  name: "disconnect",
  description: "Disconnect your connected wallet from the bot",
  category: Constants.COMMAND_CATEGORIES.WALLET,
  options: [],

  async execute(interaction: CommandInteraction) {
    const userId = interaction.user.id;

    // 1️⃣ Attempt to disconnect
    const success = await disconnectWallet(userId);

    if (!success) {
      return interaction.reply({
        embeds: [Embed.error("❌ No wallet found or already disconnected!")],
        ephemeral: true,
      });
    }

    // 2️⃣ Confirmation embed
    return interaction.reply({
      embeds: [
        Embed.success("🔌 Your wallet has been successfully disconnected!\nAll session data cleared.", "Wallet Disconnected"),
      ],
      ephemeral: true,
    });
  },
};