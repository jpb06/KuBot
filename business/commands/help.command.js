const embedHelper = require('./../util/embed.helper.js');

let unit = module.exports = {
    "process": (guildSettings, message) => {
        embedHelper
            .setup(message.channel, guildSettings)
            .sendHelpResponse();
    },
    "processAdmin": (guildSettings, message) => {
        embedHelper
            .setup(message.channel, guildSettings)
            .sendHelpAdminResponse();
    }
}