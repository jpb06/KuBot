const Discord = require('discord.js');
const errorsLogging = require('./../business/util/errors.logging.helper.js');

let unit = module.exports = {
    "map": async (client, guildsParameters) => {
        try {
            let guildsMapping = [];

            client.guilds.forEach(async (guild) => {
                let guildSettings = guildsParameters.find(g => g.guildId === guild.id);

                guildsMapping.push({
                    id: guild.id,
                    defaultChannel: guild.channels.find(channel => channel.name === guildSettings.mainChannel),
                    emergencyChannel: guild.channels.find(channel => channel.name === guildSettings.emergencyChannel)
                });

                if (guild.id === '350303355014479874') {

                    let gm = guildsMapping.find(g => g.id === guild.id);

                    let mess = await gm.emergencyChannel.fetchMessages({ limit: 1 });

                    // kubot id = 385798675533660160
                    let mes = mess.first();
                    if (mes.author.id === '385798675533660160') {
                        await mes.edit(new Discord.RichEmbed()
                            .setThumbnail('https://i.imgur.com/5L7T68j.png')
                            .setTimestamp(new Date())
                            .setFooter('kuBot', 'https://i.imgur.com/5L7T68j.png')
                            .setColor(10684167)
                            .setTitle('test2'));
                    }
                }

            });

            return guildsMapping;
        } catch (error) {
            await errorsLogging.save(error);
        }
    }
}