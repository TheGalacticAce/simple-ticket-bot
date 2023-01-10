const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const discordTranscripts = require('discord-html-transcripts')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("close")
        .setDescription("Deletes the channel")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction) {
        await interaction.reply("Closing channel")

        let ts = interaction.channel

        const attachment = await discordTranscripts.createTranscript(ts, {
            returnType: 'attachment', // Valid options: 'buffer' | 'string' | 'attachment' Default: 'attachment' OR use the enum ExportReturnType
            filename: `ticket-${interaction.user.tag}`, // Only valid with returnType is 'attachment'. Name of attachment.
            saveImages: true, // Download all images and include the image data in the HTML (allows viewing the image even after it has been deleted) (! WILL INCREASE FILE SIZE !)
            poweredBy: false // Whether to include the "Powered by discord-html-transcripts" footer
        });

        ts = interaction.guild.channels.cache.find(channel => channel.name === "transcripts");

        ts.send({
            files: [attachment],
        });

        interaction.channel.delete('Ticket closed')
            .then(console.log)
            .catch(console.error);
        
    },

}