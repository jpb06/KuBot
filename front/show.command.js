const argumentsValidation = require('./../business/commands/arguments.validation.js');
const embedHelper = require('./../business/util/embed.helper.js');
const errorsLogging = require('./../business/util/errors.logging.helper.js');
const commandsDescriptions = require('./../business/commands/commands.description.js');

const playersWatchDal = require('./../dal/mongodb/dal.players.watch.js');
const factionsWatchDal = require('./../dal/mongodb/dal.factions.watch.js');
const regionsWatchDal = require('./../dal/mongodb/dal.regions.watch.js');

let unit = module.exports = {
    "process": async (guildSettings, args, message, client) => {
        try {
            embedHelper.setup(message.channel, guildSettings, client.user.username, client.user.avatarURL);
            let errors = argumentsValidation.checkShowArgs(args);

            if (errors.length > 0) {
                embedHelper.sendValidationError(commandsDescriptions.showUsage(), errors);
            } else {
                if (args === 'players' || args === 'p') {
                    let watchedPlayers = await playersWatchDal.get(message.guild.id);

                    let description = '';
                    watchedPlayers
                        .forEach(player => {
                            description += '- **' + player.name + '**';
                            if (player.comment) description += ' - ' + player.comment;
                            description += '\n';
                        });

                    embedHelper.sendShowResponse(watchedPlayers.length, description, 'Players');
                } else if (args === 'factions' || args === 'f') {
                    let watchedFactions = await factionsWatchDal.get(message.guild.id);

                    let description = '';
                    watchedFactions
                        .forEach(faction => {
                            description += `- **${faction.name}** (${faction.identifier})\n`;
                            if (faction.alwaysDisplay) description += '\tAlways displayed\n';
                            description += '\tTags: ';

                            faction.tags.forEach(tag => {
                                description += `**${tag}**, `;
                            });
                            description = description.slice(0, -2) + '\n\n';
                        });

                    embedHelper.sendShowResponse(watchedFactions.length, description, 'Factions');
                } else if (args === 'regions' || args === 'r') {
                    let watchedRegions = await regionsWatchDal.get(message.guild.id);

                    let description = '';
                    watchedRegions
                        .forEach(region => {
                            description += `- **${region.name}** (${region.identifier})\n`;
                            if (region.alwaysDisplay) description += '\tAlways displayed\n';
                            description += '\tSystems: ';

                            region.systems.forEach(system => {
                                description += `**${system}**, `;
                            });
                            description = description.slice(0, -2) + '\n\n';
                        });

                    embedHelper.sendShowResponse(watchedRegions.length, description, 'Regions');
                }
            }
        } catch (error) {
            await errorsLogging.save(error);
            embedHelper.error(message.channel);
        }
    }
}