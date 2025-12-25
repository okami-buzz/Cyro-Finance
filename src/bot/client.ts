import { Client, GatewayIntentBits, Collection } from "discord.js";
import { loadCommands, registerCommands, CommandHandler } from "./register";
import fs from "fs";
import path from "path";
import { setPresence } from "./presence";
import { logger } from "../utils/logger";
import { Embed } from "../utils/embed";

/**
 * Creates and exports the WORLD BEST Discord Client for Cyro Finance
 */

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// 1️⃣ Load all events dynamically
const eventsPath = path.join(__dirname, "events");
fs.readdirSync(eventsPath).forEach(file => {
  if (!file.endsWith(".ts")) return;
  const event = require(path.join(eventsPath, file)).default;
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
  logger.info(`🟢 Loaded event: ${event.name}`);
});

// 2️⃣ Load all commands dynamically
loadCommands(path.join(__dirname, "..", "commands"));

// 3️⃣ Register commands globally
registerCommands(client);

// 4️⃣ Set dynamic presence
client.once("ready", () => {
  setPresence(client);
});

// 5️⃣ Log client ready WORLD BEST embed
client.once("ready", () => {
  const embed = Embed.build({
    title: "🚀 Cyro Finance Bot Client Ready",
    description: `Logged in as **${client.user?.tag}**\n` +
                 `Servers: ${client.guilds.cache.size}\nUsers: ${client.users.cache.size}`,
    color: 0x00ff00,
    footer: { text: "Made with ❤️ | By Abinash" },
    timestamp: true,
  });

  console.log(embed);
});