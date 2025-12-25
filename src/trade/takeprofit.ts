import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { Validators } from "../../utils/validators";
import { Formatter } from "../../utils/formatter";
import { executeTakeProfit } from "../../exchange/executor";

/**
 * Trade TakeProfit Command
 * Set a take-profit order for a trading position
 * Embed + Footer + World-Best formatting
 */

export default {
  data: new SlashCommandBuilder()
    .setName("takeprofit")
    .setDescription("Set a take-profit order for your open position")
    .addStringOption(option =>
      option
        .setName("symbol")
        .setDescription("Trading pair symbol (e.g., BTC/USDT)")
        .setRequired(true)
    )
    .addNumberOption(option =>
      option
        .setName("price")
        .setDescription("Price at which to take profit")
        .setRequired(true)
    )
    .addNumberOption(option =>
      option
        .setName("amount")
        .setDescription("Amount of asset to sell at take-profit")
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction) {
    const userId = interaction.user.id;
    const symbol = interaction.options.getString("symbol", true).toUpperCase();
    const price = interaction.options.getNumber("price", true);
    const amount = interaction.options.getNumber("amount", true);

    // 1️⃣ Validate inputs
    if (!Validators.isPositive(price) || !Validators.isPositive(amount)) {
      return interaction.reply({
        embeds: [Embed.error("❌ Price and amount must be positive numbers!")],
        ephemeral: true,
      });
    }

    // 2️⃣ Execute take-profit order
    try {
      const order = await executeTakeProfit(userId, symbol, price, amount);
      return interaction.reply({
        embeds: [
          Embed.success(
            `📈 Take-profit order set successfully!\n**Symbol:** ${symbol}\n**Price:** ${Formatter.formatCrypto(price, symbol.split("/")[1])}\n**Amount:** ${Formatter.formatCrypto(amount, symbol.split("/")[0])}\n**Order ID:** ${order.id}`,
            "Take-Profit Order Placed"
          ),
        ],
      });
    } catch (error: any) {
      return interaction.reply({
        embeds: [Embed.error(`❌ Failed to set take-profit: ${error.message}`)],
        ephemeral: true,
      });
    }
  },
};