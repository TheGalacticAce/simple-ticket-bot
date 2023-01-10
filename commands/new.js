const { SlashCommandBuilder } = require('discord.js')
const { ChannelType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("new")
        .setDescription("Creates a new ticket"),
    async execute(interaction) {
        const ticketChannel = interaction.guild.channels.create({
            name: `ticket ${interaction.user.tag}`,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id: interaction.user.id,
                    allow: [PermissionsBitField.Flags.ViewChannel],
                },
            ],
        });

        ticketChannel.send("Welcome, our staff will be with you soon.")
        await interaction.reply({ content: 'Channel Created', ephemeral: true });
    }
}