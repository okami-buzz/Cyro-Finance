import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { fetchAirdrops } from "../../utils/defiFetcher";

/**
 * DeFi Airdrops Command
 * Shows upcoming and active crypto airdrops
 * Embed + Footer + World-Best formatting
 */

export default {
  data: new SlashCommandBuilder()
    .setName("airdrops")
    .setDescription("View active and upcoming crypto airdrops")
    .addNumberOption(option =>
      option
        .setName("limit")
        .setDescription("Number of airdrops to display (1-10)")
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(10)
    ),

  async execute(interaction: CommandInteraction) {
    const limit = interaction.options.getNumber("limit") || 5;

    // 1️⃣ Fetch airdrop data
    const airdrops = await fetchAirdrops(limit);
    if (!airdrops || airdrops.length === 0) {
      return interaction.reply({
        embeds: [Embed.error("❌ No airdrops found!")],
        ephemeral: true,
      });
    }

    // 2️⃣ Build WORLD BEST embed
    const description = airdrops
      .map(
        (drop, index) =>
          `**${index + 1}. ${drop.name}**\n` +
          `Token: ${drop.token}\n` +
          `Start Date: ${new Date(drop.startDate).toLocaleDateString()}\n` +
          `End Date: ${new Date(drop.endDate).toLocaleDateString()}\n` +
          `Chain: ${drop.chain}`
      )
      .join("\n\n");

    const embed = Embed.build({
      title: `🎁 Active & Upcoming Airdrops`,
      description,
      color: Constants.DEFI_COLOR,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    // 3️⃣ Reply
    return interaction.reply({ embeds: [embed] });
  },
};
