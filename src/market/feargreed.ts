import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { fetchFearGreedIndex } from "../../utils/marketFetcher";

/**
 * Fear & Greed Index Command
 * Shows current Crypto Fear & Greed Index
 * Embed + Footer + World-Best formatting
 */

export default {
  data: new SlashCommandBuilder()
    .setName("feargreed")
    .setDescription("Get the current Crypto Fear & Greed Index"),

  async execute(interaction: CommandInteraction) {
    // 1️⃣ Fetch Fear & Greed Index
    const indexData = await fetchFearGreedIndex();
    if (!indexData) {
      return interaction.reply({
        embeds: [Embed.error("❌ Could not fetch Fear & Greed Index!")],
        ephemeral: true,
      });
    }

    // 2️⃣ Build WORLD BEST embed
    const embed = Embed.build({
      title: `📊 Crypto Fear & Greed Index`,
      description:
        `**Value:** ${indexData.value} / 100\n` +
        `**Mood:** ${indexData.mood}\n` +
        `**Previous Close:** ${indexData.previous}\n` +
        `**Last Updated:** ${indexData.lastUpdated}`,
      color: Constants.MARKET_COLOR,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    // 3️⃣ Reply
    return interaction.reply({ embeds: [embed] });
  },
};