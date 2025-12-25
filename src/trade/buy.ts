import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { Formatter } from "../../utils/formatter";
import { Validators } from "../../utils/validators";
import { executeBuy } from "../../exchange/executor";

/**
 * Trade Buy Command
 * Place a market buy order
 * Embed + Footer + World-Best formatting
 */

export default {
  data: new SlashCommandBuilder()
    .setName("buy")
    .setDescription("Place a market buy order for a trading pair")
    .addStringOption(option =>
      option
        .setName("symbol")
        .setDescription("Trading pair symbol (e.g., BTC/USDT)")
        .setRequired(true)
    )
    .addNumberOption(option =>
      option
        .setName("amount")
        .setDescription("Amount of base asset to buy")
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction) {
    const userId = interaction.user.id;
    const symbol = interaction.options.getString("symbol", true).toUpperCase();
    const amount = interaction.options.getNumber("amount", true);

    // 1️⃣ Validate amount
    if (!Validators.isPositive(amount)) {
      return interaction.reply({
        embeds: [Embed.error("❌ Amount must be a positive number!")],
        ephemeral: true,
      });
    }

    // 2️⃣ Execute buy order
    try {
      const order = await executeBuy(userId, symbol, amount);

      return interaction.reply({
        embeds: [
          Embed.build({
            title: `🛒 Market Buy Executed`,
            description:
              `**Symbol:** ${symbol}\n` +
              `**Amount:** ${Formatter.formatCrypto(amount, symbol.split("/")[0])}\n` +
              `**Executed Price:** ${Formatter.formatCrypto(order.price, symbol.split("/")[1])}\n` +
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
        embeds: [Embed.error(`❌ Failed to execute buy order: ${error.message}`)],
        ephemeral: true,
      });
    }
  },
};
