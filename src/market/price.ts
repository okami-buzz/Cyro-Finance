import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { getCoinPrice } from "../../utils/marketFetcher";

/**
 * Market Price Command
 * Shows current price for a specific cryptocurrency
 * Embed + Footer + World-Best formatting
 */

export default {
  data: new SlashCommandBuilder()
    .setName("price")
    .setDescription("Get current price of a cryptocurrency")
    .addStringOption(option =>
      option
        .setName("symbol")
        .setDescription("Coin symbol (e.g., BTC, ETH)")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("currency")
        .setDescription("Fiat currency (e.g., USD, INR)")
        .setRequired(false)
    ),

  async execute(interaction: CommandInteraction) {
    const symbol = interaction.options.getString("symbol", true).toUpperCase();
    const currency = (interaction.options.getString("currency") || "USD").toUpperCase();

    // 1️⃣ Fetch coin price
    const priceData = await getCoinPrice(symbol, currency);
    if (!priceData) {
      return interaction.reply({
        embeds: [Embed.error(`❌ Could not fetch price for ${symbol} in ${currency}.`)],
        ephemeral: true,
      });
    }

    // 2️⃣ Build WORLD BEST embed
    const embed = Embed.build({
      title: `💰 ${symbol} Price`,
      description:
        `**Symbol:** ${symbol}\n` +
        `**Price:** ${priceData.price} ${currency}\n` +
        `**24h High:** ${priceData.high24h} ${currency}\n` +
        `**24h Low:** ${priceData.low24h} ${currency}\n` +
        `**Market Cap:** ${priceData.marketCap} ${currency}\n` +
        `**Volume (24h):** ${priceData.volume24h} ${currency}`,
      color: Constants.MARKET_COLOR,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    // 3️⃣ Reply
    return interaction.reply({ embeds: [embed] });
  },
};