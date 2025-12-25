/**
 * Clear guild cache
 */
export async function clearGuildCache(guildId?: string): Promise<number> {
  if (guildId) {
    guildCache.delete(guildId);
    return 1;
  } else {
    const count = guildCache.size;
    guildCache.clear();
    return count;
  }
}
