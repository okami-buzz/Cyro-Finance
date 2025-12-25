import { CommandInteraction } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { Formatter } from "../../utils/formatter";
import { getPremiumStatus } from "../../db/models/premium";

/**
 * Premium Status Command
 * Show user's premium subscription info
 * Embed + Footer + World-Best formatting
 */

export default {
  name: "status",
  description: "Check your premium subscription status",
  category: Constants.COMMAND_CATEGORIES.PREMIUM,
  options: [],

  async execute(interaction: CommandInteraction) {
    const userId = interaction.user.id;

    // 1️⃣ Fetch premium info
    const premium = await getPremiumStatus(userId);
    if (!premium) {
      return interaction.reply({
        embeds: [Embed.error("❌ You do not have an active premium subscription.")],
        ephemeral: true,
      });
    }

    // 2️⃣ Build WORLD BEST embed
    const embed = Embed.build({
      title: `🌟 Premium Status`,
      description:
        `**User:** ${interaction.user.tag}\n` +
        `**Subscription Plan:** ${premium.planName}\n` +
        `**Expires At:** ${Formatter.formatTimestamp(premium.expiresAt, "long")}\n` +
        `**Perks:**\n${premium.perks.map((p: string) => `• ${p}`).join("\n")}`,
      color: Constants.PREMIUM_COLOR,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    // 3️⃣ Reply
    return interaction.reply({ embeds: [embed] });
  },
};