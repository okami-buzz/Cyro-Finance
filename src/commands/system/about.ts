import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Embed } from "../../utils/embed";
import { client } from "../../bot/client";

/**
 * About Command
 * Shows bot info, developer info, version
 * WORLD BEST embed + footer
 */

export default {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Get info about Cyro Finance bot"),

  async execute(interaction: CommandInteraction) {
    const embed = Embed.build({
      title: "🤖 About Cyro Finance",
      description: `
**Bot Name:** ${client.user?.username}
**Library:** Discord.js v14
**Developer:** Abinash
**Servers:** ${client.guilds.cache.size}
**Users:** ${client.users.cache.size}
**Version:** 1.0.0
      `,
      color: 0x9b59b6,
      footer: { text: "Made with ❤️ | By Abinash" },
      timestamp: true,
    });

    return interaction.reply({ embeds: [embed], ephemeral: true });
  },
};