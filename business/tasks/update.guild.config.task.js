
const embedHelper = require('./../util/embed.helper.js');
const errorsLogging = require('./../util/errors.logging.helper.js');

const guildConfigInitializer = require('./../../dal/initializer/guild.config.initializer.js');
const dalGuilds = require('./../../dal/mongodb/dal.guilds.js');

let unit = module.exports = {
    "start": async (message, guildsParameters) => {
        try {
            let persisted = await guildConfigInitializer.persist(message);
            if (persisted)
                guildsParameters = await dalGuilds.get();

            return guildsParameters;
        } catch (error) {
            await errorsLogging.save(error);
            embedHelper.error(message.channel);
        }
    }
}