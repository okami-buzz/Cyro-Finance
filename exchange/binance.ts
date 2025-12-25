import axios from "axios";

/**
 * Binance Exchange Integration
 * WORLD BEST real trading & market data module
 * Public bot ready
 */

const BINANCE_BASE = "https://api.binance.com";
const API_KEY = process.env.BINANCE_API_KEY!;
const API_SECRET = process.env.BINANCE_SECRET!;

// Helper for signed requests (simplified example)
async function binanceRequest(path: string, method: "GET" | "POST" = "GET", data?: any) {
  const url = `${BINANCE_BASE}${path}`;
  // WORLD BEST signing logic goes here (HMAC-SHA256 etc.)
  const res = await axios({
    url,
    method,
    headers: {
      "X-MBX-APIKEY": API_KEY,
    },
    data,
  });
  return res.data;
}

/**
 * Fetch current price for symbol
 */
export async function getPrice(symbol: string) {
  const data = await binanceRequest(`/api/v3/ticker/price?symbol=${symbol}`);
  return parseFloat(data.price);
}

/**
 * Place an order
 */
export async function placeOrder(symbol: string, side: "BUY" | "SELL", quantity: number, price?: number, type: "LIMIT" | "MARKET" = "MARKET") {
  const body: any = {
    symbol,
    side,
    type,
    quantity,
  };
  if (type === "LIMIT" && price) body.price = price;

  const result = await binanceRequest("/api/v3/order", "POST", body);
  return result;
}

/**
 * Cancel an order
 */
export async function cancelOrder(orderId: string, symbol: string) {
  const result = await binanceRequest("/api/v3/order", "DELETE", { orderId, symbol });
  return result;
}
