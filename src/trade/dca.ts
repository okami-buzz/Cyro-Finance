import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { Formatter } from "../../utils/formatter";
import { Validators } from "../../utils/validators";
import { placeDcaOrder } from "../../exchange/executor";

/**
 * Trade DCA Command
 * Place a Dollar-Cost Averaging order
 * Embed + Footer + World-Best formatting
 */

export default {
  data: new SlashCommandBuilder()
    .setName("dca")
    .setDescription("Place a Dollar-Cost Averaging (DCA) order for a trading pair")
    .addStringOption(option =>
      option
        .setName("symbol")
        .setDescription("Trading pair symbol (e.g., BTC/USDT)")
        .setRequired(true)
    )
    .addNumberOption(option =>
      option
        .setName("total")
        .setDescription("Total amount of base asset to invest")
        .setRequired(true)
    )
    .addNumberOption(option =>
      option
        .setName("interval")
        .setDescription("Interval in minutes between DCA buys")
        .setRequired(true)
    )
    .addNumberOption(option =>
      option
        .setName("parts")
        .setDescription("Number of DCA orders to split into")
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction) {
    const userId = interaction.user.id;
    const symbol = interaction.options.getString("symbol", true).toUpperCase();
    const total = interaction.options.getNumber("total", true);
    const interval = interaction.options.getNumber("interval", true);
    const parts = interaction.options.getNumber("parts", true);

    // 1️⃣ Validate inputs
    if (!Validators.isPositive(total) || !Validators.isPositive(interval) || !Validators.isPositive(parts)) {
      return interaction.reply({
        embeds: [Embed.error("❌ Total, interval, and parts must be positive numbers!")],
        ephemeral: true,
      });
    }

    // 2️⃣ Place DCA order
    try {
      const dcaOrder = await placeDcaOrder(userId, symbol, total, interval, parts);

      return interaction.reply({
        embeds: [
          Embed.build({
            title: `💰 DCA Order Placed`,
            description:
              `**Symbol:** ${symbol}\n` +
              `**Total Amount:** ${Formatter.formatCrypto(total, symbol.split("/")[0])}\n` +
              `**Interval:** ${interval} minutes\n` +
              `**Parts:** ${parts}\n` +
              `**Order ID:** ${dcaOrder.id}\n\n` +
              `✅ DCA order successfully scheduled!`,
            color: Constants.SUCCESS_COLOR,
            footer: { text: "Made with ❤️ | By Abinash" },
            timestamp: true,
          }),
        ],
      });
    } catch (error: any) {
      return interaction.reply({
        embeds: [Embed.error(`❌ Failed to place DCA order: ${error.message}`)],
        ephemeral: true,
      });
    }
  },
};