import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { getTransactionDetails } from "../../crypto/walletConnect";

/**
 * OnChain Tx Command
 * Show details for a specific on-chain transaction
 * Embed + Footer + World-Best formatting
 */

export default {
  data: new SlashCommandBuilder()
    .setName("tx")
    .setDescription("Fetch details of a specific on-chain transaction by hash")
    .addStringOption(option =>
      option
        .setName("hash")
        .setDescription("Transaction hash to fetch")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("chain")
        .setDescription("Select blockchain (e.g., ETH, BSC, Polygon)")
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction) {
    const hash = interaction.options.getString("hash", true);
    const chain = interaction.options.getString("chain", true).toUpperCase();

    // 1️⃣ Fetch transaction details
    const tx = await getTransactionDetails(chain, hash);
    if (!tx) {
      return interaction.reply({
        embeds: [Embed.error(`❌ Transaction not found on ${chain}.`)],
        ephemeral: true,
      });
    }

    // 2️⃣ Build WORLD BEST embed
    const embed = Embed.build({
      title: `📄 Transaction Details`,
      description:
        `**Chain:** ${chain}\n` +
        `**Tx Hash:** [${tx.hash}](${tx.link})\n` +
        `**From:** \`${tx.from}\`\n` +
        `**To:** \`${tx.to}\`\n` +
        `**Value:** ${tx.value} ${tx.symbol}\n` +
        `**Fee:** ${tx.fee} ${tx.feeSymbol}\n` +
        `**Status:** ${tx.status}\n` +
        `**Timestamp:** ${tx.timestamp}`,
      color: Constants.ONCHAIN_COLOR,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    // 3️⃣ Reply
    return interaction.reply({ embeds: [embed] });
  },
};