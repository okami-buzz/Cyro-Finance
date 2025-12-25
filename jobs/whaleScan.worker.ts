import { Embed } from "../utils/embed";
import { getRecentWhaleTx } from "../crypto/txBuilder";
import { Client } from "discord.js";

/**
 * Whale Scan Worker
 * WORLD BEST monitoring of large crypto transactions
 * Sends alerts to configured alert channels
 */

export async function whaleScanWorker(client: Client, alertChannelId: string) {
  try {
    // Fetch recent whale transactions
    const whales = await getRecentWhaleTx();

    if (!whales || whales.length === 0) return;

    const channel = await client.channels.fetch(alertChannelId);
    if (!channel || !channel.isTextBased()) return;

    for (const tx of whales) {
      const embed = Embed.build({
        title: "🐋 Whale Alert",
        description: `Transaction detected:\n• **From:** ${tx.from}\n• **To:** ${tx.to}\n• **Amount:** ${tx.amount} ${tx.symbol}\n• **Tx Hash:** [Link](${tx.hash})`,
        color: 0xf1c40f,
        footer: { text: "Made with ❤️ | By Abinash" },
        timestamp: true,
      });

      channel.send({ embeds: [embed] }).catch(() => {});
    }
  } catch (error) {
    console.error("[WhaleScan Worker] Error:", error);
  }
}