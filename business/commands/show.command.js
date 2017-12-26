const argumentsValidation = require('./shared/arguments.validation.js');
const embedHelper = require('./../util/embed.helper.js');
const commandsDescriptions = require('./shared/commands.description.js');

const playersWatchDal = require('./../../dal/mongodb/dal.players.watch.js');
const factionsWatchDal = require('./../../dal/mongodb/dal.factions.watch.js');

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
            if (args === 'players' || args === 'p') {
                let watchedPlayers = await playersWatchDal.get();

                let description = '';
                watchedPlayers
                    .sort((a, b) => a.name < b.name)
                    .forEach(player => {
                        description += '- **' + player.name + '**';
                        if (player.comment) description += ' - ' + player.comment;
                        description += '\n';
                    });

                message.channel.send({
                    embed: embedHelper.show(watchedPlayers.length, description, 'Players')
                });
            } else if (args === 'factions' || args === 'f') {
                let watchedFactions = await factionsWatchDal.get();

                let description = '';
                watchedFactions
                    .sort((a, b) => a.name < b.name)
                    .forEach(faction => {
                        description += `- **${faction.name}** (${faction.identifier})\n`;
                        if (faction.alwaysDisplay) description += '\tAlways displayed\n';
                        description += '\tTags: ';

                        faction.tags.forEach(tag => {
                            description += `**${tag}**, `;
                        });
                        description = description.slice(0, -2) + '\n\n';
                    });

                message.channel.send({
                    embed: embedHelper.show(watchedFactions.length, description, 'Factions')
                });
            }
        }
    }
}