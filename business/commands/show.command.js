const argumentsValidation = require('./shared/arguments.validation.js');
const embedHelper = require('./../util/embed.helper.js');
const playersWatchDal = require('./../../dal/mongodb/dal.players.watch.js');
const commandsDescriptions = require('./shared/commands.description.js');

let unit = module.exports = {
    "process": async (args, message, client) => {
        let errors = argumentsValidation.checkShowArgs(args);

        if (errors.length > 0) {
            message.channel.send({
                embed: embedHelper.validationError(
                    client.user.username,
                    client.user.avatarURL,
                    commandsDescriptions.showUsage(),
                    errors
                )
            });
        } else {
            let watchedPlayers = await playersWatchDal.get();

            message.channel.send({
                embed: embedHelper.watchedPlayers(watchedPlayers)
            });
        }
    }
}