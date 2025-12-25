import { CommandInteraction } from "discord.js";
import { Embed } from "../../utils/embed";
import { Validators } from "../../utils/validators";
import { Formatter } from "../../utils/formatter";
import { Constants } from "../../utils/constants";
import { getWalletTokens } from "../../crypto/walletConnect";

/**
 * Wallet Tokens Command
 * Fetch all ERC-20 / BEP-20 / Polygon tokens for connected wallet
 * Embed + Footer + World-Best formatting
 */

export default {
  name: "tokens",
  description: "Display all tokens in your connected wallet",
  category: Constants.COMMAND_CATEGORIES.WALLET,
  options: [],

  async execute(interaction: CommandInteraction) {
    const userId = interaction.user.id;

    // 1️⃣ Check if wallet is connected
    const wallet = await getWalletTokens(userId); // Returns { chain: string, tokens: {symbol, balance}[] }[]
    if (!wallet) {
      return interaction.reply({
        embeds: [Embed.error("❌ Wallet not connected! Use `/wallet connect` first.")],
        ephemeral: true,
      });
    }

    // 2️⃣ Build embed per chain
    const embeds = wallet.map(chainData => {
      const tokenList = chainData.tokens.map(t => `**${t.symbol}**: ${Formatter.formatCrypto(t.balance, t.symbol)}`).join("\n") || "No tokens found";

      return Embed.build({
        title: `💰 Tokens on ${chainData.chain}`,
        description: tokenList,
        color: Constants.INFO_COLOR,
        timestamp: true,
      });
    });

    // 3️⃣ Reply
    return interaction.reply({ embeds });
  },
};