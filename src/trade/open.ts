import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { Formatter } from "../../utils/formatter";
import { Validators } from "../../utils/validators";
import { getOpenTrades } from "../../exchange/executor";

/**
 * Trade Open Command
 * Show detailed info of user's open trades
 * Embed + Footer + World-Best formatting
 */

export default {
  data: new SlashCommandBuilder()
    .setName("open")
    .setDescription("Display all your open trades with detailed info"),

  async execute(interaction: CommandInteraction) {
    const userId = interaction.user.id;

    // 1️⃣ Fetch open trades
    const trades = await getOpenTrades(userId);
    if (!trades || trades.length === 0) {
      return interaction.reply({
        embeds: [Embed.error("❌ No open trades found!")],
        ephemeral: true,
      });
    }

    // 2️⃣ Build WORLD BEST embed
    const description = trades
      .map(trade => 
        `**Symbol:** ${trade.symbol}\n` +
        `**Type:** ${trade.type.toUpperCase()}\n` +
        `**Amount:** ${Formatter.formatCrypto(trade.amount, trade.symbol.split("/")[0])}\n` +
        `**Entry Price:** ${Formatter.formatCrypto(trade.entryPrice, trade.symbol.split("/")[1])}\n` +
        `**Take Profit:** ${Formatter.formatCrypto(trade.takeProfit, trade.symbol.split("/")[1])}\n` +
        `**Stop Loss:** ${Formatter.formatCrypto(trade.stopLoss, trade.symbol.split("/")[1])}\n` +
        `**Opened At:** ${Formatter.formatTimestamp(trade.createdAt, "long")}`
      )
      .join("\n\n");

    const embed = Embed.build({
      title: `📈 Your Open Trades`,
      description,
      color: Constants.INFO_COLOR,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    // 3️⃣ Reply
    return interaction.reply({ embeds: [embed] });
  },
};