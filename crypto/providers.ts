import { JsonRpcProvider, WebSocketProvider } from "ethers";
import { config } from "../config";
import { logger } from "../utils/logger";

/**
 * WORLD BEST PROVIDER MANAGER
 * Cyro Finance 🧊
 * - Multi-chain support
 * - HTTP + WS providers
 * - Failover safe
 * - Public bot ready
 * - Zero user-specific state
 * Made with ❤️ | By Abinash
 */

export type SupportedChain =
  | "ethereum"
  | "bsc"
  | "polygon"
  | "arbitrum"
  | "optimism";

interface ChainProvider {
  http: JsonRpcProvider;
  ws?: WebSocketProvider;
  name: string;
  symbol: string;
  explorer: string;
}

/* ================================
   INTERNAL PROVIDER REGISTRY
================================ */

const PROVIDERS: Record<SupportedChain, ChainProvider> = {
  ethereum: {
    name: "Ethereum",
    symbol: "ETH",
    explorer: "https://etherscan.io/tx/",
    http: new JsonRpcProvider(config.ETH_RPC),
    ws: config.ETH_WS ? new WebSocketProvider(config.ETH_WS) : undefined,
  },

  bsc: {
    name: "BNB Smart Chain",
    symbol: "BNB",
    explorer: "https://bscscan.com/tx/",
    http: new JsonRpcProvider(config.BSC_RPC),
    ws: config.BSC_WS ? new WebSocketProvider(config.BSC_WS) : undefined,
  },

  polygon: {
    name: "Polygon",
    symbol: "MATIC",
    explorer: "https://polygonscan.com/tx/",
    http: new JsonRpcProvider(config.POLYGON_RPC),
    ws: config.POLYGON_WS ? new WebSocketProvider(config.POLYGON_WS) : undefined,
  },

  arbitrum: {
    name: "Arbitrum",
    symbol: "ETH",
    explorer: "https://arbiscan.io/tx/",
    http: new JsonRpcProvider(config.ARB_RPC),
    ws: config.ARB_WS ? new WebSocketProvider(config.ARB_WS) : undefined,
  },

  optimism: {
    name: "Optimism",
    symbol: "ETH",
    explorer: "https://optimistic.etherscan.io/tx/",
    http: new JsonRpcProvider(config.OP_RPC),
    ws: config.OP_WS ? new WebSocketProvider(config.OP_WS) : undefined,
  },
};

/* ================================
   PUBLIC API – WORLD CLASS
================================ */

/**
 * Get HTTP Provider (safe for public bots)
 */
export function getProvider(chain: SupportedChain): JsonRpcProvider {
  const provider = PROVIDERS[chain]?.http;
  if (!provider) {
    logger.error(`❌ Provider not found for chain: ${chain}`);
    throw new Error(`Unsupported chain: ${chain}`);
  }
  return provider;
}

/**
 * Get WebSocket Provider (for whales, live tx, gas)
 */
export function getWsProvider(chain: SupportedChain): WebSocketProvider | null {
  const ws = PROVIDERS[chain]?.ws;
  if (!ws) {
    logger.warn(`⚠️ WS provider not configured for ${chain}`);
    return null;
  }
  return ws;
}

/**
 * Chain metadata (for embeds & UX)
 */
export function getChainMeta(chain: SupportedChain) {
  const meta = PROVIDERS[chain];
  if (!meta) throw new Error(`Unknown chain: ${chain}`);

  return {
    name: meta.name,
    symbol: meta.symbol,
    explorer: meta.explorer,
  };
}

/**
 * Build explorer tx URL (WORLD BEST embeds)
 */
export function getTxExplorerUrl(chain: SupportedChain, txHash: string): string {
  const meta = PROVIDERS[chain];
  if (!meta) return txHash;
  return `${meta.explorer}${txHash}`;
}

/**
 * Health check (used in /system status)
 */
export async function checkChainHealth(chain: SupportedChain) {
  try {
    const provider = getProvider(chain);
    const block = await provider.getBlockNumber();
    return {
      ok: true,
      latestBlock: block,
    };
  } catch (err) {
    logger.error(`❌ Chain health failed: ${chain}`);
    return {
      ok: false,
      latestBlock: null,
    };
  }
}

/* ================================
   STARTUP LOG (WORLD CLASS)
================================ */

Object.keys(PROVIDERS).forEach((c) => {
  logger.success(
    `🧊 Provider ready: ${PROVIDERS[c as SupportedChain].name} | Made with ❤️ | By Abinash`
  );
});