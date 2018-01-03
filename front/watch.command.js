const commandsDescriptions = require('./../business/commands/commands.description.js');
const argumentsValidation = require('./../business/commands/arguments.validation.js');
const embedHelper = require('./../business/util/embed.helper.js');
const errorsLogging = require('./../business/util/errors.logging.helper.js');

const playersWatchDal = require('./../dal/mongodb/dal.players.watch.js');
const factionsWatchDal = require('./../dal/mongodb/dal.factions.watch.js');

let unit = module.exports = {
    "process": async (guildSettings, args, message, client) => {
        try {
            embedHelper.setup(message.channel, guildSettings, client.user.username, client.user.avatarURL);
            let validation = argumentsValidation.checkWatchArgs(args);

            if (validation.errors.length > 0) {
                embedHelper.sendValidationError(commandsDescriptions.watchUsage(), validation.errors);
            } else {
                let watchedFactions = await factionsWatchDal.get(message.guild.id);
                let playerFactions = watchedFactions.filter(faction => faction.tags.some(tag => validation.args.player.includes(tag)));
                if (playerFactions.length > 0) {
                    let playerFactionsDesc = '';
                    playerFactions.forEach(faction => {
                        playerFactionsDesc += faction.name + '\n';
                    });

                    embedHelper.sendFactionPlayerWatchError(validation.args.player, playerFactionsDesc);
                } else {
                    await playersWatchDal.add(message.guild.id, validation.args.player, validation.args.comment);

                    embedHelper.sendWatchResponse(validation.args.player);
                }
            }
        } catch (error) {
            await errorsLogging.save(error);
            embedHelper.error(message.channel);
        }
    }
}