const argumentsValidation = require('./shared/arguments.validation.js');
const embedHelper = require('./../util/embed.helper.js');
const playersWatchDal = require('./../../dal/mongodb/dal.players.watch.js');
const factionsWatchDal = require('./../../dal/mongodb/dal.factions.watch.js');

let unit = module.exports = {
    "process": async (args, message, client) => {
        let validation = argumentsValidation.checkWatchArgs(args);

        if (validation.errors.length > 0) {
            message.channel.send({
                embed: embedHelper.populateWatchError(client.user.username, client.user.avatarURL, validation.errors)
            });
        } else {
            let watchedFactions = await factionsWatchDal.get();
            let playerFactions = watchedFactions.filter(faction => faction.tags.some(tag => validation.args.player.includes(tag)));
            if (playerFactions.length > 0) {
                let playerFactionsDesc = '';
                playerFactions.forEach(faction => {
                    playerFactionsDesc += faction.name + '\n';
                });

                message.channel.send({
                    embed: embedHelper.notifyPlayerAlreadyInFactionsWatchError(client.user.username, client.user.avatarURL, validation.args.player, playerFactionsDesc)
                });
            } else {
                await playersWatchDal.add(validation.args.player, validation.args.comment);
                message.channel.send({
                    embed: embedHelper.notifyPlayerAddedToWatchList(client.user.username, client.user.avatarURL, validation.args.player)
                });
            }
        }
    }
}