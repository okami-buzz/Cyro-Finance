import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { fetchGlobalMarketData } from "../../utils/marketFetcher";

/**
 * Global Market Command
 * Shows overall global crypto market stats
 * Embed + Footer + World-Best formatting
 */

export default {
  data: new SlashCommandBuilder()
    .setName("global")
    .setDescription("Get global cryptocurrency market statistics"),

  async execute(interaction: CommandInteraction) {
    // 1️⃣ Fetch global market data
    const data = await fetchGlobalMarketData();
    if (!data) {
      return interaction.reply({
        embeds: [Embed.error("❌ Could not fetch global market data!")],
        ephemeral: true,
      });
    }

    // 2️⃣ Build WORLD BEST embed
    const embed = Embed.build({
      title: `🌐 Global Crypto Market Stats`,
      description:
        `**Total Market Cap:** $${data.totalMarketCap.toLocaleString()}\n` +
        `**24h Volume:** $${data.totalVolume.toLocaleString()}\n` +
        `**BTC Dominance:** ${data.btcDominance}%\n` +
        `**ETH Dominance:** ${data.ethDominance}%\n` +
        `**Active Cryptocurrencies:** ${data.activeCryptos}\n` +
        `**Markets:** ${data.markets}`,
      color: Constants.MARKET_COLOR,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    // 3️⃣ Reply
    return interaction.reply({ embeds: [embed] });
  },
};