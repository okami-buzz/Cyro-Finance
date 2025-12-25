import * as dotenv from "dotenv";
dotenv.config();

interface BotConfig {
  token: string;
  clientId: string;
  ownerId: string;
  defaultPrefix: string;
  footerText: string;

  database: {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
  };

  walletConnect: {
    projectId: string;
    relayUrl: string;
  };

  exchanges: {
    binanceApiKey: string;
    binanceSecret: string;
    bybitApiKey: string;
    bybitSecret: string;
    okxApiKey: string;
    okxSecret: string;
  };

  cooldown: number;
  defaultAlertChannel?: string;
  defaultLogsChannel?: string;
}

const config: BotConfig = {
  token: process.env.BOT_TOKEN || "",
  clientId: process.env.CLIENT_ID || "",
  ownerId: process.env.OWNER_ID || "",
  defaultPrefix: process.env.PREFIX || "!",
  footerText: "Made with ❤️ | By Abinash",

  database: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "",
    name: process.env.DB_NAME || "cyrofinance",
  },

  walletConnect: {
    projectId: process.env.WC_PROJECT_ID || "",
    relayUrl: process.env.WC_RELAY || "wss://relay.walletconnect.com",
  },

  exchanges: {
    binanceApiKey: process.env.BINANCE_API_KEY || "",
    binanceSecret: process.env.BINANCE_SECRET || "",
    bybitApiKey: process.env.BYBIT_API_KEY || "",
    bybitSecret: process.env.BYBIT_SECRET || "",
    okxApiKey: process.env.OKX_API_KEY || "",
    okxSecret: process.env.OKX_SECRET || "",
  },

  cooldown: Number(process.env.COOLDOWN_MS) || 5000,
  defaultAlertChannel: process.env.DEFAULT_ALERT_CHANNEL,
  defaultLogsChannel: process.env.DEFAULT_LOGS_CHANNEL,
};

export default config;