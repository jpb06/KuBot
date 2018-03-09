const Discord = require('discord.js');
const commandsDescriptions = require('./../commands/commands.description.js');

let unit = module.exports = {
    "setup": (channel, guildSettings, authorName, authorAvatarUrl) => {
        unit.channel = channel;

        if (guildSettings) {
            unit.messagesImage = guildSettings.messagesImage;
            unit.messagesFooterName = guildSettings.messagesFooterName;
            unit.messagesImage = guildSettings.messagesImage;
            unit.scanMainRegionName = guildSettings.scanMainRegionName;
            unit.acknowledged = guildSettings.acknowledged;
        }
        unit.authorName = authorName;
        unit.authorAvatarUrl = authorAvatarUrl;

        return unit;
    },
    /* ---------------------------------------------------------------------------------------------------------------
        Generic
       ---------------------------------------------------------------------------------------------------------------*/
    "generateGeneric": () => {
        let embed = new Discord.RichEmbed()
            .setThumbnail(unit.messagesImage)
            .setTimestamp(new Date())
            .setFooter(unit.messagesFooterName, unit.messagesImage);

        return embed;
    },
    "commandsDescription": (embed) => {
        embed
            .addField('!help', 'Get help!\n')
            .addField('!scan', 'Scans Sirius sector.\n')
            .addField('!watch', 'Adds a player to the watch list.\n')
            .addField('!show', 'Displays a watch list.\n')
            .addField('!quote', 'Quotes one and only one message using its identifier.\n')
            .addField('!quotetext', 'Quotes a text.\n')
            .addField('!embed', 'Creates an embed using a title and a content message.\n');

        return embed;
    },
    "commandsDescriptionAdmin": (embed) => {
        embed
            .addField('!remove', 'Removes a player or a faction from watch lists\n')

        return embed;
    },
    "sendValidationError": (usage, errors) => {
        unit.channel.send({
            embed: unit.generateGeneric(unit.guildSettings)
                .setColor(10684167)
                .setAuthor(unit.authorName, unit.authorAvatarUrl)
                .setTitle('Invalid request')
                .setDescription(usage)
                .addField('Errors', errors)
        });
    },
    "error": (channel) => {
        channel.send({
            embed: new Discord.RichEmbed()
                .setThumbnail('https://i.imgur.com/5L7T68j.png')
                .setTimestamp(new Date())
                .setFooter('kuBot', 'https://i.imgur.com/5L7T68j.png')
                .setColor(10684167)
                .setTitle('Error')
                .setDescription('An error occurred while processing your request')
        });
    },
    /* ---------------------------------------------------------------------------------------------------------------
        Help command
       ---------------------------------------------------------------------------------------------------------------*/
    "sendHelpResponse": () => {
        unit.channel.send({
            embed: unit.commandsDescription(
                unit.generateGeneric()
                .setTitle('KuBot is monitoring Sirius Sector for you!')
                .setDescription('I am doing my best to answer your requests. Please take a look at the following commands :')
            )
        });
    },
    "sendHelpAdminResponse": () => {
        unit.channel.send({
            embed: unit.commandsDescriptionAdmin(
                unit.generateGeneric()
                .setTitle('Admin commands')
            )
        });
    },
    /* ---------------------------------------------------------------------------------------------------------------
        Scan command
       ---------------------------------------------------------------------------------------------------------------*/
    "sendScanResponse": (playersCount, factions, regions) => {
        let embed = unit.generateGeneric()
            .setColor(3447003)
            .setTitle(`**${playersCount} Players online**\n\n`)
            .setDescription(`Scanning ${unit.scanMainRegionName}...`);

        let factionsDescription = '';
        factions.forEach(faction => {
            factionsDescription += `**${faction.name}** : ${faction.count}\n`;
        });

        embed.addField('Factions', factionsDescription);

        regions.forEach(region => {
            let watch = '~';
            if (region.watch.length > 0) {
                watch = '';
                region.watch.forEach(player => {
                    watch += `${player.name}`;

                    if (player.comment)
                        watch += ` - ${player.comment}`;

                    watch += '\n';
                });
            }

            embed.addField(`**${region.name}** : ${region.count} players`, watch);
        });

        unit.channel.send({
            embed: embed
        });
    },
    /* ---------------------------------------------------------------------------------------------------------------
        Watch command
       ---------------------------------------------------------------------------------------------------------------*/
    "sendFactionPlayerWatchError": (name, factions) => {
        unit.channel.send({
            embed: unit.generateGeneric()
                .setColor(10684167)
                .setAuthor(unit.authorName, unit.authorAvatarUrl)
                .setTitle('Error')
                .setDescription(`${name} is already under watch for belonging to the following faction(s) :\n\n${factions}`)
        });
    },
    "sendWatchResponse": (name) => {
        unit.channel.send({
            embed: unit.generateGeneric()
                .setColor(3447003)
                .setAuthor(unit.authorName, unit.authorAvatarUrl)
                .setTitle(`${unit.acknowledged}`)
                .setDescription(`${name} added to the watch list`)
        });
    },
    /* ---------------------------------------------------------------------------------------------------------------
       Show command
      ---------------------------------------------------------------------------------------------------------------*/
    "sendShowResponse": (count, description, type) => {
        unit.channel.send({
            embed: unit.generateGeneric()
                .setColor(3447003)
                .setTitle(`**${count} ${type} in watch list**\n\n`)
                .setDescription(description)
        });
    },
    /* ---------------------------------------------------------------------------------------------------------------
      guild config file upload
     ---------------------------------------------------------------------------------------------------------------*/
    "sendInvalidGuildConfig": (channel, errors) => {
        channel.send({
            embed: new Discord.RichEmbed()
                .setThumbnail('https://i.imgur.com/5L7T68j.png')
                .setTimestamp(new Date())
                .setFooter('kuBot', 'https://i.imgur.com/5L7T68j.png')
                .setColor(10684167)
                .setTitle('Invalid configuration file')
                .setDescription(errors)
        });
    },
    "sendGuildSettingsInitCompleted": (channel) => {
        channel.send({
            embed: new Discord.RichEmbed()
                .setThumbnail('https://i.imgur.com/5L7T68j.png')
                .setTimestamp(new Date())
                .setFooter('kuBot', 'https://i.imgur.com/5L7T68j.png')
                .setColor(3447003)
                .setTitle('Settings importation completed')
                .setDescription('kuBot settings for your guild have been validated and saved.')
        });
    },
    /* ---------------------------------------------------------------------------------------------------------------
      remove admin command
     ---------------------------------------------------------------------------------------------------------------*/
    "sendRemoveResponse": (term, type) => {
        unit.channel.send({
            embed: unit.generateGeneric()
                .setColor(3447003)
                .setAuthor(unit.authorName, unit.authorAvatarUrl)
                .setTitle(`${unit.acknowledged}`)
                .setDescription(`${term} was removed from ${type} watch list`)
        });
    },
    "sendRemovalFailure": (term, type) => {
        unit.channel.send({
            embed: unit.generateGeneric()
                .setColor(10684167)
                .setAuthor(unit.authorName, unit.authorAvatarUrl)
                .setTitle('Request failure')
                .setDescription(`${term} isn't defined in ${type} watch list`)
        });
    },
    /* ---------------------------------------------------------------------------------------------------------------
      Factions activity notice
     ---------------------------------------------------------------------------------------------------------------*/
    "generateActivityNotice": (channel, factions) => {
        let embed = new Discord.RichEmbed()
            .setThumbnail('https://i.imgur.com/5L7T68j.png')
            .setTimestamp(new Date())
            .setFooter('kuBot', 'https://i.imgur.com/5L7T68j.png')
            .setColor(3447003)
            .setDescription('An unusually high activity has been reported');

        factions.forEach(faction => {
            embed.addField(faction.name, `${faction.playersCount} players`);
        });

        return embed;
    },
    "sendActivityNotice": (channel, factions) => {
        channel.send({
            embed: unit.generateActivityNotice(channel, factions)
        });
    },
    /* ---------------------------------------------------------------------------------------------------------------
      Quote command
     ---------------------------------------------------------------------------------------------------------------*/
    "generateQuote": (channel, user,
        quoteSendDate, quoteAuthor, quoteContent) => {
        let embed = new Discord.RichEmbed()
            .setTimestamp(quoteSendDate)
            .setFooter(`Quote requested by ${user}`, 'https://i.imgur.com/5L7T68j.png')
            .setColor(0x2e9c3f)
            .addField(`${quoteAuthor} wrote:`, quoteContent);

        return embed;
    },
    "sendQuote": (channel, user, quoteSendDate, quoteAuthor, quoteContent) => {
        channel.send({
            embed: unit.generateQuote(channel, user, quoteSendDate, quoteAuthor, quoteContent)
        });
    },
    /* ---------------------------------------------------------------------------------------------------------------
      QuoteText command
     ---------------------------------------------------------------------------------------------------------------*/
    "generateQuoteText": (channel, user, quoteContent) => {
        let embed = new Discord.RichEmbed()
            .setTimestamp(new Date())
            .setFooter('kuBot', 'https://i.imgur.com/5L7T68j.png')
            .setColor(0x2e9c3f)
            .addField(`${user} is quoting this text:`, quoteContent);

        return embed;
    },
    "sendQuoteText": (channel, user, quoteContent) => {
        channel.send({
            embed: unit.generateQuoteText(channel, user, quoteContent)
        });
    },
    /* ---------------------------------------------------------------------------------------------------------------
      Embed command
     ---------------------------------------------------------------------------------------------------------------*/
    "generateEmbed": (channel, user, title, content) => {
        let embed = new Discord.RichEmbed()
            .setTimestamp(new Date())
            .setFooter(`${user}`, 'https://i.imgur.com/5L7T68j.png')
            .setColor(0x2e9c3f)
            .addField(title, content);

        return embed;
    },
    "sendEmbed": (channel, user, title, content) => {
        channel.send({
            embed: unit.generateEmbed(channel, user, title, content)
        });
    },
}