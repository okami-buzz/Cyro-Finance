import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { Validators } from "../../utils/validators";
import { Formatter } from "../../utils/formatter";
import { Constants } from "../../utils/constants";
import { sendTokens } from "../../crypto/walletConnect";

/**
 * Wallet Send Command
 * Send tokens from connected wallet to another wallet
 * Fully embed + footer + world-class formatting
 */

export default {
  data: new SlashCommandBuilder()
    .setName("send")
    .setDescription("Send tokens from your connected wallet to another wallet")
    .addStringOption(option =>
      option
        .setName("chain")
        .setDescription("Blockchain to use (ETH/BSC/POLYGON)")
        .setRequired(true)
        .addChoices(
          { name: "Ethereum", value: "ETH" },
          { name: "BSC", value: "BSC" },
          { name: "Polygon", value: "POLYGON" }
        )
    )
    .addStringOption(option =>
      option.setName("to").setDescription("Recipient wallet address").setRequired(true)
    )
    .addStringOption(option =>
      option.setName("token").setDescription("Token symbol (e.g., USDT)").setRequired(true)
    )
    .addNumberOption(option =>
      option.setName("amount").setDescription("Amount to send").setRequired(true)
    ),

  async execute(interaction: CommandInteraction) {
    const userId = interaction.user.id;
    const chain = interaction.options.getString("chain", true).toUpperCase();
    const to = interaction.options.getString("to", true);
    const token = interaction.options.getString("token", true).toUpperCase();
    const amount = interaction.options.getNumber("amount", true);

    // 1️⃣ Wallet connected check
    const wallet = await sendTokens.getWallet(userId, chain);
    if (!wallet) {
      return interaction.reply({
        embeds: [Embed.error("❌ Wallet not connected! Use `/wallet connect` first.")],
        ephemeral: true,
      });
    }

    // 2️⃣ Validate recipient
    if (!Validators.isWalletAddress(to)) {
      return interaction.reply({
        embeds: [Embed.error("❌ Invalid recipient wallet address.")],
        ephemeral: true,
      });
    }

    // 3️⃣ Validate amount
    if (!Validators.isPositive(amount)) {
      return interaction.reply({
        embeds: [Embed.error("❌ Amount must be positive.")],
        ephemeral: true,
      });
    }

    // 4️⃣ Execute send
    try {
      const tx = await sendTokens.execute({
        from: wallet.address,
        to,
        token,
        amount,
        chain,
      });

      return interaction.reply({
        embeds: [
          Embed.success(
            `💸 Sent ${Formatter.formatCrypto(amount, token)} on ${chain}!\nTransaction Hash: [${tx.hash}](${tx.explorerUrl})`
          ),
        ],
      });
    } catch (error: any) {
      return interaction.reply({
        embeds: [Embed.error(`❌ Transaction failed: ${error.message}`)],
        ephemeral: true,
      });
    }
  },
};