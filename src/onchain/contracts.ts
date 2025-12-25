import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { getContractInfo } from "../../crypto/walletConnect";

/**
 * OnChain Contracts Command
 * Show details about a specific smart contract
 * Embed + Footer + World-Best formatting
 */

export default {
  data: new SlashCommandBuilder()
    .setName("contracts")
    .setDescription("Fetch details of a smart contract on a blockchain")
    .addStringOption(option =>
      option
        .setName("address")
        .setDescription("Contract address to fetch")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("chain")
        .setDescription("Select blockchain (e.g., ETH, BSC, Polygon)")
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction) {
    const address = interaction.options.getString("address", true);
    const chain = interaction.options.getString("chain", true).toUpperCase();

    // 1️⃣ Fetch contract info
    const contract = await getContractInfo(chain, address);
    if (!contract) {
      return interaction.reply({
        embeds: [Embed.error(`❌ No contract found at ${address} on ${chain}.`)],
        ephemeral: true,
      });
    }

    // 2️⃣ Build WORLD BEST embed
    const embed = Embed.build({
      title: `🏛️ Smart Contract Info`,
      description:
        `**Chain:** ${chain}\n` +
        `**Address:** \`${contract.address}\`\n` +
        `**Creator:** \`${contract.creator}\`\n` +
        `**Verified:** ${contract.verified ? "✅ Yes" : "❌ No"}\n` +
        `**Tx Count:** ${contract.txCount}\n` +
        `**ABI Available:** ${contract.hasABI ? "✅ Yes" : "❌ No"}\n` +
        `**Last Updated:** ${contract.lastUpdated}`,
      color: Constants.ONCHAIN_COLOR,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    // 3️⃣ Reply
    return interaction.reply({ embeds: [embed] });
  },
};
