import { getPrice as binancePrice, placeOrder as binanceOrder, cancelOrder as binanceCancel } from "./binance";
import { getPrice as okxPrice, placeOrder as okxPlace, cancelOrder as okxCancel } from "./okx";
import { getPrice as bybitPrice, placeOrder as bybitOrder, cancelOrder as bybitCancel } from "./bybit";

/**
 * Exchange Executor
 * WORLD BEST unified interface for all exchanges
 * Handles Binance, OKX, Bybit seamlessly
 */

export type Exchange = "binance" | "okx" | "bybit";
export type Side = "buy" | "sell";
export type OrderType = "market" | "limit";

export async function fetchPrice(symbol: string, exchange: Exchange): Promise<number> {
  switch (exchange) {
    case "binance": return binancePrice(symbol);
    case "okx": return okxPrice(symbol);
    case "bybit": return bybitPrice(symbol);
  }
}

export async function executeOrder(
  exchange: Exchange,
  symbol: string,
  side: Side,
  quantity: number,
  price?: number,
  type: OrderType = "market"
) {
  switch (exchange) {
    case "binance": return binanceOrder(symbol, side, quantity, price, type);
    case "okx": return okxPlace(symbol, side, quantity, price, type);
    case "bybit": return bybitOrder(symbol, side, quantity, price, type);
  }
}

export async function cancelExchangeOrder(exchange: Exchange, orderId: string, symbol: string) {
  switch (exchange) {
    case "binance": return binanceCancel(orderId, symbol);
    case "okx": return okxCancel(orderId, symbol);
    case "bybit": return bybitCancel(orderId, symbol);
  }
}