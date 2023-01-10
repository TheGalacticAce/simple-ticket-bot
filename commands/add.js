const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { PermissionsBitField } = require("discord.js")
const { ticketOpen } = require('./new')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("add")
        .setDescription("Adds a member to the ticket")
        .addUserOption( option =>
            option
                .setName("user")
                .setDescription("The user to add")
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction) {
        const ticketAddUser = interaction.options.getUser('user')

        interaction.channel.permissionOverwrites.set([
            {
                id: interaction.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel]
            },
            {
                id: ticketOpen,
                allow: [PermissionsBitField.Flags.ViewChannel]
            },
            {
                id: interaction.options.getUser('user'),
                allow: [PermissionsBitField.Flags.ViewChannel]
            }
        ])

        await interaction.reply("Successfully added " + ticketAddUser + " to the channel.")
    }
}