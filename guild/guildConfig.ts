/**
 * Guild Configuration Manager
 * WORLD BEST per-server settings for Cyro Finance
 */

interface GuildConfig {
  guildId: string;
  alertsChannelId?: string;
  logsChannelId?: string;
  tradingEnabled?: boolean;
  allowedCommands?: string[];
  premiumEnabled?: boolean;
  lastSync?: number;
}

const guildConfigs: Map<string, GuildConfig> = new Map();

/**
 * Get guild configuration
 */
export async function getGuildConfig(guildId: string): Promise<GuildConfig> {
  if (!guildConfigs.has(guildId)) {
    guildConfigs.set(guildId, {
      guildId,
      alertsChannelId: undefined,
      logsChannelId: undefined,
      tradingEnabled: false,
      allowedCommands: [],
      premiumEnabled: false,
      lastSync: Date.now(),
    });
  }
  return guildConfigs.get(guildId)!;
}

/**
 * Update guild configuration
 */
export async function updateGuildConfig(guildId: string, updates: Partial<GuildConfig>): Promise<GuildConfig> {
  const config = await getGuildConfig(guildId);
  const newConfig = { ...config, ...updates, lastSync: Date.now() };
  guildConfigs.set(guildId, newConfig);
  return newConfig;
}

/**
 * Delete guild configuration (on guild leave)
 */
export async function deleteGuildConfig(guildId: string): Promise<void> {
  guildConfigs.delete(guildId);
}