import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { getCoinChart } from "../../utils/marketFetcher";

/**
 * Market Chart Command
 * Shows a chart of a specific cryptocurrency over a selected timeframe
 * Embed + Footer + World-Best formatting
 */

export default {
  data: new SlashCommandBuilder()
    .setName("chart")
    .setDescription("Get price chart for a specific cryptocurrency")
    .addStringOption(option =>
      option
        .setName("symbol")
        .setDescription("Coin symbol (e.g., BTC, ETH)")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("timeframe")
        .setDescription("Timeframe (e.g., 1d, 7d, 30d)")
        .setRequired(false)
    ),

  async execute(interaction: CommandInteraction) {
    const symbol = interaction.options.getString("symbol", true).toUpperCase();
    const timeframe = interaction.options.getString("timeframe") || "7d";

    // 1️⃣ Fetch chart image URL
    const chartUrl = await getCoinChart(symbol, timeframe);
    if (!chartUrl) {
      return interaction.reply({
        embeds: [Embed.error(`❌ Could not fetch chart for ${symbol} (${timeframe})!`)],
        ephemeral: true,
      });
    }

    // 2️⃣ Build WORLD BEST embed
    const embed = Embed.build({
      title: `📈 ${symbol} Price Chart (${timeframe})`,
      description: `Here is the ${timeframe} price chart for **${symbol}**`,
      image: { url: chartUrl },
      color: Constants.MARKET_COLOR,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    // 3️⃣ Reply
    return interaction.reply({ embeds: [embed] });
  },
};
