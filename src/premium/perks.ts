import { CommandInteraction } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { getPremiumPerks } from "../../db/models/premium";

/**
 * Premium Perks Command
 * Show all perks for premium users
 * Embed + Footer + World-Best formatting
 */

export default {
  name: "perks",
  description: "Show all premium perks available",
  category: Constants.COMMAND_CATEGORIES.PREMIUM,
  options: [],

  async execute(interaction: CommandInteraction) {
    // 1️⃣ Fetch all perks
    const perks = await getPremiumPerks();
    if (!perks || perks.length === 0) {
      return interaction.reply({
        embeds: [Embed.error("❌ No premium perks found!")],
        ephemeral: true,
      });
    }

    // 2️⃣ Build WORLD BEST embed
    const embed = Embed.build({
      title: `🌟 Premium Perks`,
      description: perks.map((perk: string, index: number) => `**${index + 1}.** ${perk}`).join("\n"),
      color: Constants.PREMIUM_COLOR,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    // 3️⃣ Reply
    return interaction.reply({ embeds: [embed] });
  },
};
