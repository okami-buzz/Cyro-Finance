import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { getTopLosers } from "../../utils/marketFetcher";

/**
 * Market Losers Command
 * Shows the top losing cryptocurrencies over 24h
 * Embed + Footer + World-Best formatting
 */

export default {
  data: new SlashCommandBuilder()
    .setName("losers")
    .setDescription("Get the top losing cryptocurrencies in the last 24h")
    .addNumberOption(option =>
      option
        .setName("limit")
        .setDescription("Number of coins to display (1-10)")
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(10)
    ),

  async execute(interaction: CommandInteraction) {
    const limit = interaction.options.getNumber("limit") || 5;

    // 1️⃣ Fetch top losers
    const losers = await getTopLosers(limit);
    if (!losers || losers.length === 0) {
      return interaction.reply({
        embeds: [Embed.error("❌ No losers found in the last 24h!")],
        ephemeral: true,
      });
    }

    // 2️⃣ Build WORLD BEST embed
    const description = losers
      .map(
        (coin, index) =>
          `**${index + 1}. ${coin.symbol}**\n` +
          `Price: ${coin.price} USD\n` +
          `Change (24h): ${coin.change24h}%\n` +
          `Market Cap: ${coin.marketCap} USD`
      )
      .join("\n\n");

    const embed = Embed.build({
      title: `📉 Top Losing Cryptocurrencies (24h)`,
      description,
      color: Constants.MARKET_COLOR,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    // 3️⃣ Reply
    return interaction.reply({ embeds: [embed] });
  },
};