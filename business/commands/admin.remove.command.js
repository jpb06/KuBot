const argumentsValidation = require('./shared/arguments.validation.js');
const embedHelper = require('./../util/embed.helper.js');
const commandsDescriptions = require('./shared/commands.description.js');

const playersWatchDal = require('./../../dal/mongodb/dal.players.watch.js');
const factionsWatchDal = require('./../../dal/mongodb/dal.factions.watch.js');

let unit = module.exports = {
    "process": async (guildSettings, args, message, client) => {
        embedHelper.setup(message.channel, guildSettings, client.user.username, client.user.avatarURL);
        let errors = argumentsValidation.checkAdminRemoveArgs(args);

        if (errors.length > 0) {
            embedHelper.sendValidationError(commandsDescriptions.adminRemoveUsage(), errors);
        } else {
            let result = false;
            let type = '';
            if (args[0] === 'player' || args[0] === 'p') {
                type = 'Players';
                result = await playersWatchDal.remove(message.guild.id, args[1]);
            } else if (args[0] === 'faction' || args[0] === 'f') {
                type = 'Factions';
                result = await factionsWatchDal.remove(message.guild.id, args[1]);
            }

            if (result) {
                embedHelper.sendRemoveResponse(args[1], type);
            } else {
                embedHelper.sendRemovalFailure(args[1], type);
            }
        }
    }
}