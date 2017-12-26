const argumentsValidation = require('./shared/arguments.validation.js');
const embedHelper = require('./../util/embed.helper.js');
const commandsDescriptions = require('./shared/commands.description.js');

const playersWatchDal = require('./../../dal/mongodb/dal.players.watch.js');
const factionsWatchDal = require('./../../dal/mongodb/dal.factions.watch.js');

let unit = module.exports = {
    "process": async (args, message, client) => {
        let errors = argumentsValidation.checkAdminRemoveArgs(args);

        if (errors.length > 0) {
            message.channel.send({
                embed: embedHelper.validationError(
                    client.user.username,
                    client.user.avatarURL,
                    commandsDescriptions.adminRemoveUsage(),
                    errors
                )
            });
        } else {
            let result = false;
            let type = '';
            if (args[0] === 'player' || args[0] === 'p') {
                type = 'Players';
                result = await playersWatchDal.remove(args[1]);
            } else if (args[0] === 'faction' || args[0] === 'f') {
                type = 'Factions';
                result = await factionsWatchDal.remove(args[1]);
            }

            if (result) {
                message.channel.send({
                    embed: embedHelper.removed(client.user.username, client.user.avatarURL, args[1], type)
                });
            } else {
                message.channel.send({
                    embed: embedHelper.failedToRemove(client.user.username, client.user.avatarURL, args[1], type)
                });
            }
        }
    }
}