import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { fetchCoinNews } from "../../utils/newsFetcher";

/**
 * Coin News Command
 * Shows latest news for a specific cryptocurrency
 * Embed + Footer + World-Best formatting
 */

export default {
  data: new SlashCommandBuilder()
    .setName("coin")
    .setDescription("Get the latest news for a specific cryptocurrency")
    .addStringOption(option =>
      option
        .setName("symbol")
        .setDescription("Enter coin symbol (e.g., BTC, ETH)")
        .setRequired(true)
    )
    .addNumberOption(option =>
      option
        .setName("limit")
        .setDescription("Number of news articles to display (1-10)")
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(10)
    ),

  async execute(interaction: CommandInteraction) {
    const symbol = interaction.options.getString("symbol", true).toUpperCase();
    const limit = interaction.options.getNumber("limit") || 5;

    // 1️⃣ Fetch coin-specific news
    const news = await fetchCoinNews(symbol, limit);
    if (!news || news.length === 0) {
      return interaction.reply({
        embeds: [Embed.error(`❌ No news found for ${symbol}!`)],
        ephemeral: true,
      });
    }

    // 2️⃣ Build WORLD BEST embed
    const description = news
      .map((item, index) =>
        `**${index + 1}. [${item.title}](${item.url})**\n` +
        `${item.source} • ${item.publishedAt}`
      )
      .join("\n\n");

    const embed = Embed.build({
      title: `🪙 ${symbol} News`,
      description,
      color: Constants.NEWS_COLOR,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    // 3️⃣ Reply
    return interaction.reply({ embeds: [embed] });
  },
};
