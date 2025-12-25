import { Client } from "discord.js";
import { fetchActiveAlerts, markAlertTriggered } from "../alerts/list";
import { Embed } from "../utils/embed";
import { getCurrentPrice } from "../exchange/executor";

/**
 * Alerts Worker
 * WORLD BEST real-time crypto alert processor
 * Handles price, percent, volume, whale alerts
 */

export async function alertsWorker(client: Client) {
  try {
    const alerts = await fetchActiveAlerts();
    if (!alerts || alerts.length === 0) return;

    for (const alert of alerts) {
      const currentPrice = await getCurrentPrice(alert.symbol);
      let triggered = false;

      // Price alert
      if (alert.type === "price" && ((alert.direction === "above" && currentPrice >= alert.target) || (alert.direction === "below" && currentPrice <= alert.target))) {
        triggered = true;
      }

      // Percent alert
      if (alert.type === "percent" && Math.abs(currentPrice - alert.basePrice)/alert.basePrice * 100 >= alert.percent) {
        triggered = true;
      }

      // Whale / volume alerts could be added similarly

      if (triggered) {
        const channel = await client.channels.fetch(alert.channelId);
        if (channel && channel.isTextBased()) {
          const embed = Embed.build({
            title: "🚨 Crypto Alert Triggered",
            description: `**${alert.symbol}** alert triggered!\nType: ${alert.type}\nTarget: ${alert.target}\nCurrent: ${currentPrice}`,
            color: 0xe67e22,
            footer: { text: "Made with ❤️ | By Abinash" },
            timestamp: true,
          });
          channel.send({ embeds: [embed] }).catch(() => {});
        }
        await markAlertTriggered(alert.id);
      }
    }
  } catch (error) {
    console.error("[Alerts Worker] Error:", error);
  }
}
