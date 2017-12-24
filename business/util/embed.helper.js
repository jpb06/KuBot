const Discord = require('discord.js');
const commandsDescriptions = require('./../commands/shared/commands.description.js');

let unit = module.exports = {
    "botAvatarUrl": '',
    "init": (botAvatarUrl) => {
        unit.botAvatarUrl = botAvatarUrl;
        return unit;
    },
    "generateGeneric": () => {
        let embed = new Discord.RichEmbed()
            .setThumbnail('https://i.imgur.com/V16L8i9.jpg')
            .setTimestamp(new Date())
            .setFooter('Kusari Kaigun', unit.botAvatarUrl);

        return embed;
    },
    "populateCommandsDescription": (embed) => {
        embed.addField('!help', 'Get help!\n\n' +
            commandsDescriptions.helpUsage())
            .addField('!scan', 'Scans Sirius sector.\n\n' +
            commandsDescriptions.scanUsage());

        return embed;
    },
    "populateLoadedNotification": () => {
        let embed = unit.generateGeneric()
            .setTitle('KuBot successfully loaded')
            .setDescription('I am now ready for action!\n\nType !help to see what I can do!');

        return embed;
    },
    "populateHelp": () => {
        let embed = unit.generateGeneric()
            .setTitle('KuBot is monitoring Sirius Sector for you!')
            .setDescription('I am doing my best to answer your requests. Please take a look at the following commands :');

        return unit.populateCommandsDescription(embed);
    },
    "populateScan": (playersCount, factions, regions) => {
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
            embed.addField(`**${region.name}** : ${region.count} players`, `~`);
        });


        return embed;
    }
}