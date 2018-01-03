const embedHelper = require('./../business/util/embed.helper.js');
const errorsLogging = require('./../business/util/errors.logging.helper.js');

let unit = module.exports = {
    "process": async (guildSettings, message) => {
        try {
            embedHelper
                .setup(message.channel, guildSettings)
                .sendHelpResponse();
        } catch (error) {
            await errorsLogging.save(error);
            embedHelper.error(message.channel);
        }
    },
    "processAdmin": async (guildSettings, message) => {
        try {
            embedHelper
                .setup(message.channel, guildSettings)
                .sendHelpAdminResponse();
        } catch (error) {
            await errorsLogging.save(error);
            embedHelper.error(message.channel);
        }
    }
}