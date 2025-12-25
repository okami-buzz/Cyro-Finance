import { Client } from "discord.js";
import { Embed } from "../utils/embed";
import { clearExpiredAlerts, clearGuildCache } from "../guild/guildCache";

/**
 * Cleanup Worker
 * WORLD BEST periodic cleanup of expired alerts & guild caches
 * Keeps bot memory optimized & server-safe
 */

export async function cleanupWorker(client: Client) {
  try {
    // Clear expired alerts
    const clearedAlerts = await clearExpiredAlerts();
    
    // Clear old guild cache
    const clearedCache = await clearGuildCache();

    // Optional: send summary to admin / log channel
    console.log(`[Cleanup] Cleared ${clearedAlerts} expired alerts & ${clearedCache} guild cache entries at ${new Date().toISOString()}`);

    // WORLD BEST summary embed (optional, can be sent to a specific log channel)
    // const embed = Embed.build({
    //   title: "🧹 Cleanup Worker Summary",
    //   description: `Cleared **${clearedAlerts}** expired alerts\nCleared **${clearedCache}** guild cache entries`,
    //   color: 0x9b59b6,
    //   footer: { text: "Made with ❤️ | By Abinash" },
    //   timestamp: true,
    // });
    // logChannel.send({ embeds: [embed] });

  } catch (error) {
    console.error("[Cleanup Worker] Error:", error);
  }
}