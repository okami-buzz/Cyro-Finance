import {
  CommandInteraction,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
  EmbedBuilder,
} from "discord.js";
import { Embed } from "../../utils/embed";

/**
 * Help Command
 * Shows all commands and features with interactive dropdown
 * WORLD BEST embed + footer
 */

export default {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("View all commands and features of Cyro Finance bot"),

  async execute(interaction: CommandInteraction) {
    // WORLD BEST Embed
    const mainEmbed = Embed.build({
      title: "📜 Cyro Finance Command Center",
      description: "Select a category below to view commands & features:",
      color: 0x00bfff,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    // Dropdown menu with all categories
    const menu = new StringSelectMenuBuilder()
      .setCustomId("help-menu")
      .setPlaceholder("Select a category")
      .addOptions(
        new StringSelectMenuOptionBuilder().setLabel("System").setValue("system").setDescription("Bot info, ping, status, help"),
        new StringSelectMenuOptionBuilder().setLabel("Admin").setValue("admin").setDescription("Server setup, alerts, logs, permissions"),
        new StringSelectMenuOptionBuilder().setLabel("Market").setValue("market").setDescription("Price, top, gainers, losers, chart, global, dominance, feargreed"),
        new StringSelectMenuOptionBuilder().setLabel("Wallet").setValue("wallet").setDescription("Connect, balance, tokens, nfts, send, history, disconnect"),
        new StringSelectMenuOptionBuilder().setLabel("Trade").setValue("trade").setDescription("Buy, sell, limit, stoploss, takeprofit, dca, open, cancel, status"),
        new StringSelectMenuOptionBuilder().setLabel("DeFi").setValue("defi").setDescription("TVL, APY, staking, pools, airdrops"),
        new StringSelectMenuOptionBuilder().setLabel("OnChain").setValue("onchain").setDescription("Gas, transactions, whales, contracts"),
        new StringSelectMenuOptionBuilder().setLabel("News").setValue("news").setDescription("Latest, coin, trending"),
        new StringSelectMenuOptionBuilder().setLabel("Premium").setValue("premium").setDescription("Premium status & perks"),
        new StringSelectMenuOptionBuilder().setLabel("Alerts").setValue("alerts").setDescription("Price, percent, volume, whale alerts")
      );

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu);

    await interaction.reply({ embeds: [mainEmbed], components: [row], ephemeral: true });

    // Collector for dropdown menu
    const collector = interaction.channel?.createMessageComponentCollector({
      filter: i => i.user.id === interaction.user.id,
      time: 60000,
    });

    collector?.on("collect", async i => {
      if (!i.isStringSelectMenu()) return;

      let embed: EmbedBuilder;

      switch (i.values[0]) {
        case "system":
          embed = Embed.build({
            title: "⚙️ System Commands",
            description: `
• /ping → Check bot latency
• /status → View bot status & uptime
• /about → Bot info & version
• /help → This interactive help menu
            `,
            color: 0x1abc9c,
            footer: { text: "Made with ❤️ | By Abinash" },
            timestamp: true,
          });
          break;

        case "admin":
          embed = Embed.build({
            title: "🛠 Admin Commands",
            description: `
• /setup → First-time server setup
• /alerts-channel → Set alerts channel
• /logs-channel → Set logs channel
• /permissions → Manage command permissions
• /trading-toggle → Enable/disable trading
            `,
            color: 0xe67e22,
            footer: { text: "Made with ❤️ | By Abinash" },
            timestamp: true,
          });
          break;

        case "market":
          embed = Embed.build({
            title: "📈 Market Commands",
            description: `
• /price → Get coin price
• /top → Top coins
• /gainers → Top gainers
• /losers → Top losers
• /chart → Coin chart
• /global → Global market stats
• /dominance → Market dominance
• /feargreed → Fear & greed index
            `,
            color: 0xf1c40f,
            footer: { text: "Made with ❤️ | By Abinash" },
            timestamp: true,
          });
          break;

        case "wallet":
          embed = Embed.build({
            title: "👛 Wallet Commands",
            description: `
• /wallet connect → Connect your wallet
• /wallet balance → Check balance
• /wallet tokens → List tokens
• /wallet nfts → List NFTs
• /wallet send → Send crypto
• /wallet history → Transaction history
• /wallet disconnect → Disconnect wallet
            `,
            color: 0x9b59b6,
            footer: { text: "Made with ❤️ | By Abinash" },
            timestamp: true,
          });
          break;

        case "trade":
          embed = Embed.build({
            title: "💱 Trade Commands",
            description: `
• /trade buy → Buy crypto
• /trade sell → Sell crypto
• /trade limit → Place limit order
• /trade stoploss → Set stoploss
• /trade takeprofit → Set takeprofit
• /trade dca → DCA strategy
• /trade open → Open orders
• /trade cancel → Cancel order
• /trade status → Check trade status
            `,
            color: 0xe74c3c,
            footer: { text: "Made with ❤️ | By Abinash" },
            timestamp: true,
          });
          break;

        case "defi":
          embed = Embed.build({
            title: "💹 DeFi Commands",
            description: `
• /defi tvl → Total value locked
• /defi apy → APY of pools
• /defi staking → Staking info
• /defi pools → List pools
• /defi airdrops → Active airdrops
            `,
            color: 0x2ecc71,
            footer: { text: "Made with ❤️ | By Abinash" },
            timestamp: true,
          });
          break;

        case "onchain":
          embed = Embed.build({
            title: "⛓ OnChain Commands",
            description: `
• /onchain gas → Gas prices
• /onchain tx → Transactions
• /onchain whale → Whales info
• /onchain contracts → Smart contracts
            `,
            color: 0x3498db,
            footer: { text: "Made with ❤️ | By Abinash" },
            timestamp: true,
          });
          break;

        case "news":
          embed = Embed.build({
            title: "📰 News Commands",
            description: `
• /news latest → Latest news
• /news coin → Coin news
• /news trending → Trending news
            `,
            color: 0x8e44ad,
            footer: { text: "Made with ❤️ | By Abinash" },
            timestamp: true,
          });
          break;

        case "premium":
          embed = Embed.build({
            title: "💎 Premium Commands",
            description: `
• /premium status → Check premium status
• /premium perks → View premium perks
            `,
            color: 0xf39c12,
            footer: { text: "Made with ❤️ | By Abinash" },
            timestamp: true,
          });
          break;

        case "alerts":
          embed = Embed.build({
            title: "🚨 Alerts Commands",
            description: `
• /alerts create → Create alert
• /alerts percent → Percent change alert
• /alerts volume → Volume alert
• /alerts whale → Whale movement alert
• /alerts list → List alerts
• /alerts pause → Pause alerts
• /alerts remove → Remove alert
            `,
            color: 0xe74c3c,
            footer: { text: "Made with ❤️ | By Abinash" },
            timestamp: true,
          });
          break;

        default:
          embed = Embed.build({
            title: "❌ Unknown category",
            description: "Please select a valid category from the menu.",
            color: 0xff0000,
            footer: { text: "Made with ❤️ | By Abinash" },
            timestamp: true,
          });
      }

      await i.update({ embeds: [embed], components: [row] });
    });
  },
};
