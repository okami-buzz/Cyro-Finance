import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { fetchLatestNews } from "../../utils/newsFetcher";

/**
 * Latest News Command
 * Shows the latest crypto news articles
 * Embed + Footer + World-Best formatting
 */

export default {
  data: new SlashCommandBuilder()
    .setName("latest")
    .setDescription("Get the most recent crypto news")
    .addNumberOption(option =>
      option
        .setName("limit")
        .setDescription("Number of news articles to display (1-10)")
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(10)
    ),

  async execute(interaction: CommandInteraction) {
    const limit = interaction.options.getNumber("limit") || 5;

    // 1️⃣ Fetch latest news
    const news = await fetchLatestNews(limit);
    if (!news || news.length === 0) {
      return interaction.reply({
        embeds: [Embed.error("❌ No latest news found!")],
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
      title: `🗞️ Latest Crypto News`,
      description,
      color: Constants.NEWS_COLOR,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    // 3️⃣ Reply
    return interaction.reply({ embeds: [embed] });
  },
};