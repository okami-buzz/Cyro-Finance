import { Client } from "discord.js";
import { logger } from "../utils/logger";
import { Embed } from "../utils/embed";
import { Constants } from "../utils/constants";

/**
 * Bot Presence Handler
 * Sets dynamic status/presence for Cyro Finance
 * WORLD BEST formatting + Made with ❤️ footer
 */

export const setPresence = (client: Client) => {
  try {
    const statuses = [
      "Cyro Finance | /help",
      "Trading & Wallets Live",
      "DeFi, OnChain, Market Data",
      "Made with ❤️ | By Abinash"
    ];

    let i = 0;
    setInterval(() => {
      client.user?.setPresence({
        activities: [{ name: statuses[i % statuses.length], type: 0 }],
        status: "online",
      });
      i++;
    }, 10000); // rotate every 10 sec

    logger.info("✅ Presence rotation started for Cyro Finance bot");

    const embed = Embed.build({
      title: "🤖 Bot Presence Activated",
      description: "Dynamic status rotation enabled successfully!",
      color: Constants.SUCCESS_COLOR,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    console.log(embed);
  } catch (error) {
    logger.error(`❌ Error setting presence: ${error}`);
  }
};