import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { getDefiAPY } from "../../utils/defiFetcher";

/**
 * DeFi APY Command
 * Shows APY stats across popular DeFi pools or protocols
 * Embed + Footer + World-Best formatting
 */

export default {
  data: new SlashCommandBuilder()
    .setName("apy")
    .setDescription("View APY statistics for popular DeFi pools")
    .addNumberOption(option =>
      option
        .setName("limit")
        .setDescription("Number of protocols/pools to display (1-10)")
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(10)
    ),

  async execute(interaction: CommandInteraction) {
    const limit = interaction.options.getNumber("limit") || 5;

    // 1️⃣ Fetch APY data
    const apyData = await getDefiAPY(limit);
    if (!apyData || apyData.length === 0) {
      return interaction.reply({
        embeds: [Embed.error("❌ No APY data found!")],
        ephemeral: true,
      });
    }

    // 2️⃣ Build WORLD BEST embed
    const description = apyData
      .map(
        (pool, index) =>
          `**${index + 1}. ${pool.name}**\n` +
          `APY: ${pool.apy}%\n` +
          `TVL: $${pool.tvl.toLocaleString()}\n` +
          `Chain: ${pool.chain}`
      )
      .join("\n\n");

    const embed = Embed.build({
      title: `📊 DeFi APY Stats`,
      description,
      color: Constants.DEFI_COLOR,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    // 3️⃣ Reply
    return interaction.reply({ embeds: [embed] });
  },
};