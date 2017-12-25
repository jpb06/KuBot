const Discord = require('discord.js');
const commandsDescriptions = require('./../commands/shared/commands.description.js');

let unit = module.exports = {
    "botAvatarUrl": '',
    "init": (botAvatarUrl) => {
        unit.botAvatarUrl = botAvatarUrl;
        return unit;
    },
    /* ---------------------------------------------------------------------------------------------------------------
        Generic
       ---------------------------------------------------------------------------------------------------------------*/
    "generateGeneric": () => {
        let embed = new Discord.RichEmbed()
            .setThumbnail('https://i.imgur.com/V16L8i9.jpg')
            .setTimestamp(new Date())
            .setFooter('Kusari Kaigun', unit.botAvatarUrl);

        return embed;
    },
    "commandsDescription": (embed) => {
        embed.addField('!help', 'Get help!\n\n' +
            commandsDescriptions.helpUsage())
            .addField('!scan', 'Scans Sirius sector.\n\n' +
            commandsDescriptions.scanUsage())
            .addField('!watch', 'Adds a player to the watch list.\n\n' +
            commandsDescriptions.watchUsage());

        return embed;
    },
    "loadedNotification": () => {
        let embed = unit.generateGeneric()
            .setTitle('KuBot successfully loaded')
            .setDescription('I am now ready for action!\n\nType !help to see what I can do!');

        return embed;
    },
    /* ---------------------------------------------------------------------------------------------------------------
        Help command
       ---------------------------------------------------------------------------------------------------------------*/
    "help": () => {
        let embed = unit.generateGeneric()
            .setTitle('KuBot is monitoring Sirius Sector for you!')
            .setDescription('I am doing my best to answer your requests. Please take a look at the following commands :');

        return unit.commandsDescription(embed);
    },
    /* ---------------------------------------------------------------------------------------------------------------
        Scan command
       ---------------------------------------------------------------------------------------------------------------*/
    "scan": (playersCount, factions, regions) => {
        let embed = unit.generateGeneric()
            .setColor(3447003)
            .setTitle(`**${playersCount} Players online**\n\n`)
            .setDescription('Scanning House Kusari region...');

        let factionsDescription = '';
        factions.forEach(faction => {
            factionsDescription += `**${faction.name}** : ${faction.count}\n`;
        });

        embed.addField('Factions', factionsDescription + '\n');

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


        return embed;
    },
    /* ---------------------------------------------------------------------------------------------------------------
        Watch command
       ---------------------------------------------------------------------------------------------------------------*/
    "watchError": (authorName, authorAvatarUrl, errors) => {
        let embed = unit.generateGeneric()
            .setColor(10684167)
            .setAuthor(authorName, authorAvatarUrl)
            .setTitle('Invalid request')
            .setDescription(commandsDescriptions.watchUsage())
            .addField('Errors', errors);

        return embed;
    },
    "playerAlreadyInFactionsWatchError": (authorName, authorAvatarUrl, name, factions) => {
        let embed = unit.generateGeneric()
            .setColor(3447003)
            .setAuthor(authorName, authorAvatarUrl)
            .setTitle('Error')
            .setDescription(`${name} is already under watch for belonging to the following faction(s) :\n\n${factions}`);

        return embed;
    },
    "playerAddedToWatchList": (authorName, authorAvatarUrl, name) => {
        let embed = unit.generateGeneric()
            .setColor(3447003)
            .setAuthor(authorName, authorAvatarUrl)
            .setTitle('Ryoukai!')
            .setDescription(`${name} added to the watch list`);

        return embed;
    },
}