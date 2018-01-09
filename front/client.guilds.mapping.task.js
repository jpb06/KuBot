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
            });

            return guildsMapping;
        } catch (error) {
            await errorsLogging.save(error);
        }
    }
}