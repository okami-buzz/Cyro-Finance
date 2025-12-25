import { CommandInteraction } from "discord.js";
import { Embed } from "../../utils/embed";
import { Validators } from "../../utils/validators";
import { Formatter } from "../../utils/formatter";
import { Constants } from "../../utils/constants";
import { getWalletNFTs } from "../../crypto/walletConnect";

/**
 * Wallet NFTs Command
 * Fetch all NFTs for connected wallet
 * Embed + Footer + World-Best formatting
 */

export default {
  name: "nfts",
  description: "Display all NFTs in your connected wallet",
  category: Constants.COMMAND_CATEGORIES.WALLET,
  options: [],

  async execute(interaction: CommandInteraction) {
    const userId = interaction.user.id;

    // 1️⃣ Check if wallet is connected
    const walletNFTs = await getWalletNFTs(userId); // Returns { chain: string, nfts: {name, tokenId, image}[] }[]
    if (!walletNFTs || walletNFTs.length === 0) {
      return interaction.reply({
        embeds: [Embed.error("❌ Wallet not connected or no NFTs found! Use `/wallet connect` first.")],
        ephemeral: true,
      });
    }

    // 2️⃣ Build embed per chain
    const embeds = walletNFTs.map(chainData => {
      const nftList = chainData.nfts
        .map(nft => `**${nft.name}** (#${nft.tokenId})`)
        .slice(0, 10)
        .join("\n") || "No NFTs found";

      return Embed.build({
        title: `🖼 NFTs on ${chainData.chain}`,
        description: nftList,
        color: Constants.INFO_COLOR,
        timestamp: true,
        imageUrl: chainData.nfts[0]?.image, // Show first NFT image as embed thumbnail
      });
    });

    // 3️⃣ Reply
    return interaction.reply({ embeds });
  },
};