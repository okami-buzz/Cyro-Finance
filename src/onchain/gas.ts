import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { getGasPrice } from "../../crypto/walletConnect";

/**
 * OnChain Gas Command
 * Shows current gas prices for a blockchain
 * Embed + Footer + World-Best formatting
 */

export default {
  data: new SlashCommandBuilder()
    .setName("gas")
    .setDescription("Get the current gas price for a specific blockchain")
    .addStringOption(option =>
      option
        .setName("chain")
        .setDescription("Select blockchain (e.g., ETH, BSC, Polygon)")
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction) {
    const chain = interaction.options.getString("chain", true).toUpperCase();

    // 1️⃣ Fetch gas price
    const gas = await getGasPrice(chain);
    if (!gas) {
      return interaction.reply({
        embeds: [Embed.error(`❌ Could not fetch gas price for ${chain}.`)],
        ephemeral: true,
      });
    }

    // 2️⃣ Build WORLD BEST embed
    const embed = Embed.build({
      title: `⛽ Gas Price - ${chain}`,
      description:
        `**Safe Low:** ${gas.safeLow} Gwei\n` +
        `**Standard:** ${gas.standard} Gwei\n` +
        `**Fast:** ${gas.fast} Gwei\n` +
        `**Fastest:** ${gas.fastest} Gwei`,
      color: Constants.ONCHAIN_COLOR,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    // 3️⃣ Reply
    return interaction.reply({ embeds: [embed] });
  },
};