import { Client } from "discord.js";
import { fetchMarketPrices } from "../exchange/executor";
import { Embed } from "../utils/embed";

/**
 * Price Sync Worker
 * WORLD BEST real-time crypto prices for market commands & alerts
 */

export async function priceSyncWorker(client: Client) {
  try {
    // Fetch latest market prices
    const prices = await fetchMarketPrices();

    if (!prices || prices.length === 0) return;

    // Example: optionally update channels or internal cache
    // (Public bot safe: updates are handled server-side)
    console.log(`[PriceSync] Synced ${prices.length} coins at ${new Date().toISOString()}`);

    // Optional: send summary embed to admin channel (if configured)
    // const embed = Embed.build({
    //   title: "📊 Market Price Sync",
    //   description: prices.slice(0, 5).map(p => `• ${p.symbol}: $${p.price}`).join("\n"),
    //   color: 0x2ecc71,
    //   footer: { text: "Made with ❤️ | By Abinash" },
    //   timestamp: true,
    // });
    // adminChannel.send({ embeds: [embed] });
    
  } catch (error) {
    console.error("[PriceSync Worker] Error:", error);
  }
}