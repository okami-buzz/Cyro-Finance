import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { Formatter } from "../../utils/formatter";
import { Validators } from "../../utils/validators";
import { placeLimitOrder } from "../../exchange/executor";

/**
 * Trade Limit Command
 * Place a limit buy/sell order
 * Embed + Footer + World-Best formatting
 */

export default {
  data: new SlashCommandBuilder()
    .setName("limit")
    .setDescription("Place a limit order (buy/sell) for a trading pair")
    .addStringOption(option =>
      option
        .setName("symbol")
        .setDescription("Trading pair symbol (e.g., BTC/USDT)")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("side")
        .setDescription("Order type: buy or sell")
        .setRequired(true)
        .addChoices(
          { name: "Buy", value: "buy" },
          { name: "Sell", value: "sell" }
        )
    )
    .addNumberOption(option =>
      option
        .setName("price")
        .setDescription("Price at which to execute the order")
        .setRequired(true)
    )
    .addNumberOption(option =>
      option
        .setName("amount")
        .setDescription("Amount of base asset to trade")
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction) {
    const userId = interaction.user.id;
    const symbol = interaction.options.getString("symbol", true).toUpperCase();
    const side = interaction.options.getString("side", true).toLowerCase();
    const price = interaction.options.getNumber("price", true);
    const amount = interaction.options.getNumber("amount", true);

    // 1️⃣ Validate inputs
    if (!Validators.isPositive(price) || !Validators.isPositive(amount)) {
      return interaction.reply({
        embeds: [Embed.error("❌ Price and amount must be positive numbers!")],
        ephemeral: true,
      });
    }

    // 2️⃣ Place limit order
    try {
      const order = await placeLimitOrder(userId, symbol, side, price, amount);

      return interaction.reply({
        embeds: [
          Embed.build({
            title: `📌 Limit Order Placed`,
            description:
              `**Symbol:** ${symbol}\n` +
              `**Side:** ${side.toUpperCase()}\n` +
              `**Amount:** ${Formatter.formatCrypto(amount, symbol.split("/")[0])}\n` +
              `**Price:** ${Formatter.formatCrypto(price, symbol.split("/")[1])}\n` +
              `**Order ID:** ${order.id}\n\n` +
              `✅ Order placed successfully!`,
            color: Constants.SUCCESS_COLOR,
            footer: { text: "Made with ❤️ | By Abinash" },
            timestamp: true,
          }),
        ],
      });
    } catch (error: any) {
      return interaction.reply({
        embeds: [Embed.error(`❌ Failed to place limit order: ${error.message}`)],
        ephemeral: true,
      });
    }
  },
};