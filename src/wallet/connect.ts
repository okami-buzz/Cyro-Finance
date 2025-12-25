import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { Validators } from "../../utils/validators";
import { connectWallet } from "../../crypto/walletConnect";

/**
 * Wallet Connect Command
 * Connect your wallet securely to the bot
 * Embed + Footer + World-Best formatting
 */

export default {
  data: new SlashCommandBuilder()
    .setName("connect")
    .setDescription("Connect your wallet to Cyro Finance bot")
    .addStringOption(option =>
      option
        .setName("chain")
        .setDescription("Blockchain to connect (ETH/BSC/POLYGON)")
        .setRequired(true)
        .addChoices(
          { name: "Ethereum", value: "ETH" },
          { name: "BSC", value: "BSC" },
          { name: "Polygon", value: "POLYGON" }
        )
    )
    .addStringOption(option =>
      option.setName("address").setDescription("Your wallet address").setRequired(true)
    ),

  async execute(interaction: CommandInteraction) {
    const userId = interaction.user.id;
    const chain = interaction.options.getString("chain", true).toUpperCase();
    const address = interaction.options.getString("address", true);

    // 1️⃣ Validate wallet address
    if (!Validators.isWalletAddress(address)) {
      return interaction.reply({
        embeds: [Embed.error("❌ Invalid wallet address!")],
        ephemeral: true,
      });
    }

    // 2️⃣ Attempt to connect
    try {
      const success = await connectWallet(userId, chain, address);
      if (!success) throw new Error("Connection failed");

      return interaction.reply({
        embeds: [
          Embed.success(
            `🔗 Wallet **${address}** connected successfully on **${chain}**!`,
            "Wallet Connected"
          ),
        ],
        ephemeral: true,
      });
    } catch (error: any) {
      return interaction.reply({
        embeds: [Embed.error(`❌ Wallet connection failed: ${error.message}`)],
        ephemeral: true,
      });
    }
  },
};