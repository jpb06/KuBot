const errorsLogging = require('./../business/util/errors.logging.helper.js');
const dalGuilds = require('./../dal/mongodb/dal.guilds.js');

let unit = module.exports = {
    "start": async (guild, guildsParameters) => {
        try {
            console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);

            if (guildsParameters.filter(configuredGuild => configuredGuild.guildId === guild.id).length === 0) {
                let defaultSettings = {
                    guildId: guild.id,
                    messagesImage: 'https://i.imgur.com/5L7T68j.png',
                    messagesFooterName: 'kuBot',
                    scanMainRegionName: 'Sirius Sector',
                    acknowledged: 'Understood!',
                    mainChannel: 'bots',
                    adminChannel: 'admin',
                    emergencyChannel: 'emergency'
                };

                await dalGuilds.create(defaultSettings);
                guildsParameters.push(defaultSettings);
                return guildsParameters;
            }
        } catch (err) {
            await errorsLogging.save(err);
        }
    }
}