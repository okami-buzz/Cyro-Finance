import { ethers } from "ethers";
import { encryptData, decryptData } from "../security/encryption";
import { config } from "../config";

/**
 * Transaction Builder
 * WORLD BEST for Cyro Finance
 * Handles creating, signing & sending blockchain transactions securely
 */

interface TxOptions {
  fromPrivateKey: string;       // encrypted private key
  toAddress: string;
  amount: string | number;
  chain: "ethereum" | "bsc" | "polygon";
  tokenAddress?: string;        // ERC20 token address
  gasLimit?: number;
  gasPrice?: string;
}

export async function buildAndSendTx(options: TxOptions) {
  const { fromPrivateKey, toAddress, amount, chain, tokenAddress, gasLimit, gasPrice } = options;

  // WORLD BEST: decrypt private key
  const privateKey = decryptData(fromPrivateKey);

  // Select RPC based on chain
  const rpcUrls: Record<string, string> = {
    ethereum: config.ETH_RPC,
    bsc: config.BSC_RPC,
    polygon: config.POLYGON_RPC,
  };
  const provider = new ethers.JsonRpcProvider(rpcUrls[chain]);

  const wallet = new ethers.Wallet(privateKey, provider);

  let tx;
  if (tokenAddress) {
    // ERC20 transfer
    const erc20 = new ethers.Contract(
      tokenAddress,
      [
        "function transfer(address to, uint amount) public returns (bool)",
      ],
      wallet
    );
    tx = await erc20.transfer(toAddress, ethers.parseUnits(amount.toString(), 18));
  } else {
    // Native token transfer
    tx = await wallet.sendTransaction({
      to: toAddress,
      value: ethers.parseEther(amount.toString()),
      gasLimit: gasLimit || 21000,
      gasPrice: gasPrice ? ethers.parseUnits(gasPrice, "gwei") : undefined,
    });
  }

  await tx.wait(); // WORLD BEST: wait for confirmation

  console.log(`🌟 [Cyro Finance] Transaction sent | ${tx.hash} | Made with ❤️ | By Abinash`);

  return tx.hash;
}