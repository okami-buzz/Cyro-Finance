import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { getDefiPools } from "../../utils/defiFetcher";

/**
 * DeFi Pools Command
 * Shows available DeFi pools with APY and total value locked
 * Embed + Footer + World-Best formatting
 */

export default {
  data: new SlashCommandBuilder()
    .setName("pools")
    .setDescription("View available DeFi pools and their stats")
    .addNumberOption(option =>
      option
        .setName("limit")
        .setDescription("Number of pools to display (1-10)")
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(10)
    ),

  async execute(interaction: CommandInteraction) {
    const limit = interaction.options.getNumber("limit") || 5;

    // 1️⃣ Fetch DeFi pools
    const pools = await getDefiPools(limit);
    if (!pools || pools.length === 0) {
      return interaction.reply({
        embeds: [Embed.error("❌ No DeFi pools found!")],
        ephemeral: true,
      });
    }

    // 2️⃣ Build WORLD BEST embed
    const description = pools
      .map(
        (pool, index) =>
          `**${index + 1}. ${pool.name}**\n` +
          `TVL: $${pool.tvl.toLocaleString()}\n` +
          `APY: ${pool.apy}%\n` +
          `Chain: ${pool.chain}`
      )
      .join("\n\n");

    const embed = Embed.build({
      title: `🏦 Available DeFi Pools`,
      description,
      color: Constants.DEFI_COLOR,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    // 3️⃣ Reply
    return interaction.reply({ embeds: [embed] });
  },
};