import crypto from "crypto";

/**
 * Encryption Utility
 * WORLD BEST E2EE for wallet & trade data
 * Public bot safe
 */

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16; // 16 bytes IV
const KEY = crypto.scryptSync(process.env.ENCRYPTION_KEY || "supersecretkey", "salt", 32);

export function encryptData(plainText: string): { content: string; iv: string; authTag: string } {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

  let encrypted = cipher.update(plainText, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag().toString("hex");

  return { content: encrypted, iv: iv.toString("hex"), authTag };
}

export function decryptData(encryptedData: { content: string; iv: string; authTag: string }): string {
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, Buffer.from(encryptedData.iv, "hex"));
  decipher.setAuthTag(Buffer.from(encryptedData.authTag, "hex"));

  let decrypted = decipher.update(encryptedData.content, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}