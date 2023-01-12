const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Sends the bot ping"),
    async execute(interaction) {
        await interaction.reply(`Pong! Websocket heartbeat: ${client.ws.ping}ms.`);
    }
}