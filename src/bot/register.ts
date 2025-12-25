import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { Client, Collection } from "discord.js";
import fs from "fs";
import path from "path";
import { logger } from "../utils/logger";
import { Embed } from "../utils/embed";

interface Command {
  data: any;
  execute: Function;
}

// Collection of commands
export const CommandHandler: Collection<string, Command> = new Collection();

/**
 * Load all commands from src/commands folder
 */
export const loadCommands = (dir: string) => {
  const commandFiles = fs.readdirSync(dir).filter(file => file.endsWith(".ts"));
  for (const file of commandFiles) {
    const filePath = path.join(dir, file);
    const command: Command = require(filePath).default;
    CommandHandler.set(command.data.name, command);
    logger.info(`🟢 Loaded command: /${command.data.name}`);
  }
};

/**
 * Register slash commands globally (world best safe)
 */
export const registerCommands = async (client: Client) => {
  try {
    const commands = CommandHandler.map(cmd => cmd.data.toJSON());
    const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN!);

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID!),
      { body: commands }
    );

    logger.info("✅ Slash commands registered globally!");
    console.log(
      Embed.build({
        title: "🌐 Commands Registered",
        description: `Loaded ${commands.length} commands successfully.`,
        color: 0x00ff00,
        footer: { text: "Made with ❤️ | By Abinash" },
        timestamp: true,
      })
    );
  } catch (error) {
    logger.error(`❌ Error registering commands: ${error}`);
  }
};