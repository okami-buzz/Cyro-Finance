import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { getWhaleTransfers } from "../../crypto/walletConnect";

/**
 * OnChain Whale Command
 * Shows the largest recent crypto transfers
 * Embed + Footer + World-Best formatting
 */

export default {
  data: new SlashCommandBuilder()
    .setName("whale")
    .setDescription("Display the biggest crypto transfers on-chain")
    .addStringOption(option =>
      option
        .setName("chain")
        .setDescription("Select blockchain (e.g., ETH, BSC, Polygon)")
        .setRequired(true)
    )
    .addNumberOption(option =>
      option
        .setName("limit")
        .setDescription("Number of recent whale transactions to display")
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(20)
    ),

  async execute(interaction: CommandInteraction) {
    const chain = interaction.options.getString("chain", true).toUpperCase();
    const limit = interaction.options.getNumber("limit") || 5;

    // 1️⃣ Fetch whale transfers
    const whales = await getWhaleTransfers(chain, limit);
    if (!whales || whales.length === 0) {
      return interaction.reply({
        embeds: [Embed.error(`❌ No whale transfers found for ${chain}.`)],
        ephemeral: true,
      });
    }

    // 2️⃣ Build WORLD BEST embed
    const description = whales
      .map((tx, index) =>
        `**${index + 1}.** ${tx.amount} ${tx.symbol} transferred\n` +
        `From: \`${tx.from}\`\n` +
        `To: \`${tx.to}\`\n` +
        `Tx Hash: [${tx.hash}](${tx.link})\n` +
        `Timestamp: ${tx.timestamp}`
      )
      .join("\n\n");

    const embed = Embed.build({
      title: `🐋 Top Whale Transfers - ${chain}`,
      description,
      color: Constants.ONCHAIN_COLOR,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    // 3️⃣ Reply
    return interaction.reply({ embeds: [embed] });
  },
};