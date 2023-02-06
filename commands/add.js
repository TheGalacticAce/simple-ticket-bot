const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { PermissionsBitField } = require("discord.js")

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

        interaction.channel.permissionOverwrites.edit(interaction.options.getUser('user'), { ViewChannel: true })

        await interaction.reply("Successfully added <@" + ticketAddUser + "> to the channel.")

    }
}
