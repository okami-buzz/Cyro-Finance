import { CommandInteraction } from "discord.js";
import { Embed } from "../../utils/embed";
import { Formatter } from "../../utils/formatter";
import { Constants } from "../../utils/constants";
import { getWalletHistory } from "../../crypto/walletConnect";

/**
 * Wallet History Command
 * Fetch transaction history for connected wallet
 * Embed + Footer + World-Best formatting
 */

export default {
  name: "history",
  description: "Display transaction history of your connected wallet",
  category: Constants.COMMAND_CATEGORIES.WALLET,
  options: [],

  async execute(interaction: CommandInteraction) {
    const userId = interaction.user.id;

    // 1️⃣ Fetch wallet history
    const history = await getWalletHistory(userId); // Returns [{chain, type, token, amount, to, from, txHash, timestamp}]
    if (!history || history.length === 0) {
      return interaction.reply({
        embeds: [Embed.error("❌ No transaction history found or wallet not connected!")],
        ephemeral: true,
      });
    }

    // 2️⃣ Map transactions into embeds (max 10 per embed for cleanliness)
    const embeds = history.slice(0, 10).map(tx => {
      const description = `**Type:** ${tx.type.toUpperCase()}\n` +
                          `**Token:** ${Formatter.formatCrypto(tx.amount, tx.token)}\n` +
                          `**From:** ${tx.from}\n` +
                          `**To:** ${tx.to}\n` +
                          `**Chain:** ${tx.chain}\n` +
                          `**Timestamp:** ${Formatter.formatTimestamp(tx.timestamp, "long")}\n` +
                          `**TX Hash:** [${tx.txHash}](https://etherscan.io/tx/${tx.txHash})`;

      return Embed.build({
        title: `💳 Transaction on ${tx.chain}`,
        description,
        color: Constants.INFO_COLOR,
        timestamp: true,
      });
    });

    // 3️⃣ Reply
    return interaction.reply({ embeds });
  },
};