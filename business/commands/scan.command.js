const dalFactions = require('./../../dal/mongodb/dal.factions.watch.js');
const dalRegions = require('./../../dal/mongodb/dal.regions.watch.js');
const dalPlayers = require('./../../dal/mongodb/dal.players.watch.js');

const dataFetchingTask = require('./../tasks/fetch.online.players.task.js');
const watchTransformTask = require('./../tasks/watch.transform.task.js');
const embedHelper = require('./../util/embed.helper.js');

let unit = module.exports = {
    "process": async (guildSettings, message, client) => {
        let onlinePlayers = await dataFetchingTask.start();

        let watchedFactions = await dalFactions.get(message.guild.id);
        let factions = watchTransformTask.filter(onlinePlayers, watchedFactions, (watch, player) => {
            return watch.tags.some(tag => player.Name.includes(tag));
        });

        let watchedRegions = await dalRegions.get(message.guild.id);
        let regions = watchTransformTask.filter(onlinePlayers, watchedRegions, (watch, player) => {
            return watch.systems.some(system => player.System === system);
        });

        let watchedPlayers = await dalPlayers.get(message.guild.id);

        regions.forEach(region => {
            let localPlayersWatch = watchedPlayers.filter(watchedPlayer => region.players.some(localPlayer => localPlayer.Name === watchedPlayer.name));

            watchedFactions.forEach(faction => {
                let factionPlayers = region.players.filter(localPlayer => faction.tags.some(tag => localPlayer.Name.includes(tag)));
                factionPlayers.forEach(player => {
                    localPlayersWatch.push({ name: player.Name, comment: faction.name });
                });
            });

            region.watch = localPlayersWatch;
        });

        embedHelper
            .setup(message.channel, guildSettings)
            .sendScanResponse(onlinePlayers.length, factions, regions);
    }
}