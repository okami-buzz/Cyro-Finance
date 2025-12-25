import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { config } from "../config";
import { User } from "../db/models/user";
import { encryptData, decryptData } from "../security/encryption";

/**
 * WalletConnect Module
 * WORLD BEST for Cyro Finance
 * Handles wallet connect/disconnect and user accounts
 */

interface WalletSession {
  connector: WalletConnect;
  userId: string;
}

const sessions: Map<string, WalletSession> = new Map();

export async function connectWallet(userId: string) {
  if (sessions.has(userId)) {
    throw new Error("Wallet already connected!");
  }

  const connector = new WalletConnect({
    bridge: config.WC_RELAY,
    qrcodeModal: QRCodeModal,
  });

  if (!connector.connected) {
    await connector.createSession();
  }

  connector.on("connect", async (error, payload) => {
    if (error) throw error;

    const { accounts } = payload.params[0];
    const encryptedAccounts = encryptData(accounts);

    // Save to user
    await User.update(
      { walletConnected: true, settings: { ...accounts } },
      { where: { discordId: userId } }
    );

    sessions.set(userId, { connector, userId });

    console.log(`🌟 [Cyro Finance] Wallet connected for user ${userId} | Made with ❤️ | By Abinash`);
  });

  connector.on("disconnect", async () => {
    await disconnectWallet(userId);
  });

  return connector.uri; // return QR code URI for client
}

export async function disconnectWallet(userId: string) {
  const session = sessions.get(userId);
  if (!session) return;

  await session.connector.killSession();
  sessions.delete(userId);

  await User.update(
    { walletConnected: false },
    { where: { discordId: userId } }
  );

  console.log(`🌟 [Cyro Finance] Wallet disconnected for user ${userId} | Made with ❤️ | By Abinash`);
}

export function getWalletSession(userId: string) {
  return sessions.get(userId) || null;
}