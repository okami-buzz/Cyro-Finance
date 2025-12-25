import { CommandInteraction, Interaction } from "discord.js";
import { CommandInteraction, Interaction } from "discord.js";
import { CommandInteraction, Interaction } from "discord.js";
import { Embed } from "../utils/embed";

/**
 * Audit Logger
 * WORLD BEST tracking of command usage & important events
 * Public bot ready
 */

interface AuditEntry {
  userId: string;
  command: string;
  timestamp: number;
  guildId?: string;
}

const auditLog: AuditEntry[] = [];

/**
 * Log a command / interaction usage
 */
export function logAudit(interaction: CommandInteraction | Interaction) {
  const entry: AuditEntry = {
    userId: interaction.user.id,
    command: interaction.isCommand() ? interaction.commandName : "unknown",
    timestamp: Date.now(),
    guildId: interaction.guildId,
  };

  auditLog.push(entry);
  // Limit memory usage: keep last 1000 entries
  if (auditLog.length > 1000) auditLog.shift();

  // Optional: log to console in WORLD BEST format
  console.log(`[Audit] User: ${entry.userId} | Command: ${entry.command} | Guild: ${entry.guildId || "DM"} | Time: ${new Date(entry.timestamp).toISOString()}`);
}

/**
 * Generate embed for recent audit entries
 */
export function getAuditEmbed(): any {
  const description = auditLog.slice(-10).map(e => 
    `• <@${e.userId}> used \`${e.command}\` in ${e.guildId ? `<#${e.guildId}>` : "DM"} at ${new Date(e.timestamp).toLocaleTimeString()}`
  ).join("\n") || "No recent activity.";

  return Embed.build({
    title: "📝 Recent Audit Log",
    description,
    color: 0x3498db,
    footer: { text: "Made with ❤️ | By Abinash" },
    timestamp: true,
  });
}
