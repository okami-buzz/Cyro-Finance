import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { fetchDominanceData } from "../../utils/marketFetcher";

/**
 * Market Dominance Command
 * Shows BTC/ETH dominance and top coin dominance
 * Embed + Footer + World-Best formatting
 */

export default {
  data: new SlashCommandBuilder()
    .setName("dominance")
    .setDescription("Get the current market dominance of top cryptocurrencies"),

  async execute(interaction: CommandInteraction) {
    // 1️⃣ Fetch dominance data
    const data = await fetchDominanceData();
    if (!data) {
      return interaction.reply({
        embeds: [Embed.error("❌ Could not fetch market dominance data!")],
        ephemeral: true,
      });
    }

    // 2️⃣ Build WORLD BEST embed
    const description = Object.entries(data)
      .map(([coin, value]) => `**${coin}:** ${value}%`)
      .join("\n");

    const embed = Embed.build({
      title: `📊 Crypto Market Dominance`,
      description,
      color: Constants.MARKET_COLOR,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    // 3️⃣ Reply
    return interaction.reply({ embeds: [embed] });
  },
};