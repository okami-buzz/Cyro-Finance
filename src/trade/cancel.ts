import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { Validators } from "../../utils/validators";
import { cancelOrder } from "../../exchange/executor";

/**
 * Trade Cancel Command
 * Cancel a specific open trade
 * Embed + Footer + World-Best formatting
 */

export default {
  data: new SlashCommandBuilder()
    .setName("cancel")
    .setDescription("Cancel an open trade by its order ID")
    .addStringOption(option =>
      option
        .setName("order_id")
        .setDescription("The ID of the trade/order to cancel")
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction) {
    const userId = interaction.user.id;
    const orderId = interaction.options.getString("order_id", true);

    // 1️⃣ Validate input
    if (!Validators.isNonEmptyString(orderId)) {
      return interaction.reply({
        embeds: [Embed.error("❌ Order ID cannot be empty!")],
        ephemeral: true,
      });
    }

    // 2️⃣ Attempt to cancel the order
    try {
      const result = await cancelOrder(userId, orderId);

      if (!result) {
        return interaction.reply({
          embeds: [Embed.error("❌ Could not find or cancel the specified order!")],
          ephemeral: true,
        });
      }

      return interaction.reply({
        embeds: [
          Embed.build({
            title: `🛑 Trade Cancelled`,
            description:
              `**Order ID:** ${orderId}\n` +
              `✅ The trade has been successfully cancelled!`,
            color: Constants.SUCCESS_COLOR,
            footer: { text: "Made with ❤️ | By Abinash" },
            timestamp: true,
          }),
        ],
      });
    } catch (error: any) {
      return interaction.reply({
        embeds: [Embed.error(`❌ Failed to cancel trade: ${error.message}`)],
        ephemeral: true,
      });
    }
  },
};