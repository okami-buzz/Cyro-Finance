import "dotenv/config";
import { client } from "./bot/client";
import { registerCommands } from "./bot/register";
import { initDatabase } from "./db/index";
import { Embed } from "./utils/embed";

async function main() {
  try {
    console.log("🌟 Starting Cyro Finance BOT...");

    // Initialize DB
    await initDatabase();
    console.log("✅ Database connected");

    // Register slash commands
    await registerCommands();
    console.log("✅ Commands registered");

    // Login to Discord
    await client.login(process.env.BOT_TOKEN);
    console.log("✅ Bot logged in");

    client.once("ready", () => {
      console.log(`🚀 Logged in as ${client.user?.tag}`);
    });

    client.on("error", (error) => {
      console.error("❌ Discord client error:", error);
    });
  } catch (err) {
    console.error("❌ Error during startup:", err);
  }
}

// Start the bot
main();

// Optional: showcase WORLD BEST embed on startup in a test channel (if exists)
async function sendStartupEmbed() {
  const testGuildId = process.env.TEST_GUILD_ID;
  const testChannelId = process.env.TEST_CHANNEL_ID;

  if (!testGuildId || !testChannelId) return;

  const guild = await client.guilds.fetch(testGuildId).catch(() => null);
  if (!guild) return;

  const channel = await guild.channels.fetch(testChannelId).catch(() => null);
  if (!channel || !channel.isTextBased()) return;

  const embed = Embed.build({
    title: "🚀 Cyro Finance BOT Started",
    description: "The world best crypto bot is now online!\nMade with ❤️ | By Abinash",
    color: 0x0099ff,
    footer: { text: "Made with ❤️ | By Abinash" },
    timestamp: true,
  });

  channel.send({ embeds: [embed] });
}

// Delay to ensure client is ready
setTimeout(() => sendStartupEmbed(), 5000);