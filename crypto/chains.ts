/**
 * WORLD BEST CHAIN REGISTRY
 * Cyro Finance 🧊
 *
 * - Single source of truth for all chains
 * - Used in embeds, wallets, trades, alerts, jobs
 * - Public bot safe (no secrets)
 * - Ultra scalable & future-proof
 *
 * Made with ❤️ | By Abinash
 */

export type ChainKey =
  | "ethereum"
  | "bsc"
  | "polygon"
  | "arbitrum"
  | "optimism";

/* ================================
   CHAIN METADATA INTERFACE
================================ */

export interface ChainInfo {
  key: ChainKey;
  name: string;
  short: string;
  symbol: string;
  chainId: number;
  decimals: number;

  emoji: string;
  color: number;

  explorer: {
    tx: string;
    address: string;
  };

  nativeToken: {
    name: string;
    symbol: string;
  };

  gas: {
    fast: number;
    average: number;
    slow: number;
  };
}

/* ================================
   WORLD BEST CHAIN MAP
================================ */

export const CHAINS: Record<ChainKey, ChainInfo> = {
  ethereum: {
    key: "ethereum",
    name: "Ethereum",
    short: "ETH",
    symbol: "ETH",
    chainId: 1,
    decimals: 18,
    emoji: "🟣",
    color: 0x8c8cff,

    explorer: {
      tx: "https://etherscan.io/tx/",
      address: "https://etherscan.io/address/",
    },

    nativeToken: {
      name: "Ether",
      symbol: "ETH",
    },

    gas: {
      fast: 30,
      average: 20,
      slow: 12,
    },
  },

  bsc: {
    key: "bsc",
    name: "BNB Smart Chain",
    short: "BSC",
    symbol: "BNB",
    chainId: 56,
    decimals: 18,
    emoji: "🟡",
    color: 0xf0b90b,

    explorer: {
      tx: "https://bscscan.com/tx/",
      address: "https://bscscan.com/address/",
    },

    nativeToken: {
      name: "BNB",
      symbol: "BNB",
    },

    gas: {
      fast: 6,
      average: 4,
      slow: 3,
    },
  },

  polygon: {
    key: "polygon",
    name: "Polygon",
    short: "MATIC",
    symbol: "MATIC",
    chainId: 137,
    decimals: 18,
    emoji: "🟪",
    color: 0x8247e5,

    explorer: {
      tx: "https://polygonscan.com/tx/",
      address: "https://polygonscan.com/address/",
    },

    nativeToken: {
      name: "Matic",
      symbol: "MATIC",
    },

    gas: {
      fast: 80,
      average: 45,
      slow: 30,
    },
  },

  arbitrum: {
    key: "arbitrum",
    name: "Arbitrum One",
    short: "ARB",
    symbol: "ETH",
    chainId: 42161,
    decimals: 18,
    emoji: "🔵",
    color: 0x28a0f0,

    explorer: {
      tx: "https://arbiscan.io/tx/",
      address: "https://arbiscan.io/address/",
    },

    nativeToken: {
      name: "Ether",
      symbol: "ETH",
    },

    gas: {
      fast: 0.4,
      average: 0.25,
      slow: 0.15,
    },
  },

  optimism: {
    key: "optimism",
    name: "Optimism",
    short: "OP",
    symbol: "ETH",
    chainId: 10,
    decimals: 18,
    emoji: "🔴",
    color: 0xff0420,

    explorer: {
      tx: "https://optimistic.etherscan.io/tx/",
      address: "https://optimistic.etherscan.io/address/",
    },

    nativeToken: {
      name: "Ether",
      symbol: "ETH",
    },

    gas: {
      fast: 0.5,
      average: 0.3,
      slow: 0.2,
    },
  },
};

/* ================================
   WORLD CLASS HELPERS
================================ */

/**
 * Get chain info safely
 */
export function getChain(chain: ChainKey): ChainInfo {
  const info = CHAINS[chain];
  if (!info) throw new Error(`Unsupported chain: ${chain}`);
  return info;
}

/**
 * Get all chains (used in /help dropdown)
 */
export function getAllChains(): ChainInfo[] {
  return Object.values(CHAINS);
}

/**
 * Validate chain input from users
 */
export function isValidChain(chain: string): chain is ChainKey {
  return chain in CHAINS;
}

/**
 * Build explorer URLs (WORLD BEST EMBEDS)
 */
export function buildTxUrl(chain: ChainKey, txHash: string): string {
  return `${CHAINS[chain].explorer.tx}${txHash}`;
}

export function buildAddressUrl(chain: ChainKey, address: string): string {
  return `${CHAINS[chain].explorer.address}${address}`;
}

/**
 * Pretty chain label for embeds
 */
export function chainLabel(chain: ChainKey): string {
  const c = CHAINS[chain];
  return `${c.emoji} **${c.name}** (${c.symbol})`;
    }
