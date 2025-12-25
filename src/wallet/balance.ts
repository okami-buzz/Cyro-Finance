import { CommandInteraction } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { Formatter } from "../../utils/formatter";
import { getWalletBalance } from "../../crypto/walletConnect";

/**
 * Wallet Balance Command
 * Fetch all balances for connected wallet
 * Embed + Footer + World-Best formatting
 */

export default {
  name: "balance",
  description: "Display the balance of your connected wallet",
  category: Constants.COMMAND_CATEGORIES.WALLET,
  options: [],

  async execute(interaction: CommandInteraction) {
    const userId = interaction.user.id;

    // 1️⃣ Fetch wallet balances
    const balances = await getWalletBalance(userId); // Returns [{chain, token, amount}]
    if (!balances || balances.length === 0) {
      return interaction.reply({
        embeds: [Embed.error("❌ Wallet not connected or no balances found! Use `/wallet connect` first.")],
        ephemeral: true,
      });
    }

    // 2️⃣ Group balances by chain
    const chains = [...new Set(balances.map(b => b.chain))];

    const embeds = chains.map(chain => {
      const chainBalances = balances
        .filter(b => b.chain === chain)
        .map(b => `**${b.token}**: ${Formatter.formatCrypto(b.amount, b.token)}`)
        .join("\n") || "No balances found";

      return Embed.build({
        title: `💰 Balances on ${chain}`,
        description: chainBalances,
        color: Constants.INFO_COLOR,
        timestamp: true,
      });
    });

    // 3️⃣ Reply
    return interaction.reply({ embeds });
  },
};
