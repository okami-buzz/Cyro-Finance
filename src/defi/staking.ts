import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { Constants } from "../../utils/constants";
import { getUserStakingInfo } from "../../crypto/walletConnect";

/**
 * DeFi Staking Command
 * Shows the user's staking info across supported protocols
 * Wallet required + Embed + Footer + World-Best formatting
 */

export default {
  data: new SlashCommandBuilder()
    .setName("staking")
    .setDescription("View your DeFi staking positions across chains"),

  async execute(interaction: CommandInteraction) {
    const userId = interaction.user.id;

    // 1️⃣ Ensure wallet is connected
    const wallet = await getUserStakingInfo(userId);
    if (!wallet) {
      return interaction.reply({
        embeds: [Embed.error("❌ You need to connect your wallet first using `/wallet connect`.")],
        ephemeral: true,
      });
    }

    // 2️⃣ Build staking info
    if (wallet.stakes.length === 0) {
      return interaction.reply({
        embeds: [Embed.info("You currently have no staking positions.")],
        ephemeral: true,
      });
    }

    const description = wallet.stakes
      .map(
        (stake, index) =>
          `**${index + 1}. ${stake.token}**\n` +
          `Amount: ${stake.amount} ${stake.token}\n` +
          `APY: ${stake.apy}%\n` +
          `Locked Until: ${new Date(stake.lockedUntil).toLocaleDateString()}`
      )
      .join("\n\n");

    // 3️⃣ Build WORLD BEST embed
    const embed = Embed.build({
      title: `🪙 Your DeFi Staking Positions`,
      description,
      color: Constants.DEFI_COLOR,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    // 4️⃣ Reply
    return interaction.reply({ embeds: [embed] });
  },
};