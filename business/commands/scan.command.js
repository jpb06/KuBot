const dalFactions = require('./../../dal/mongodb/dal.factions.watch.js');
const dalRegions = require('./../../dal/mongodb/dal.regions.watch.js');

const dataFetchingTask = require('./../tasks/fetch.online.players.task.js');
const watchTransformTask = require('./../tasks/watch.transform.task.js');
const embedHelper = require('./../util/embed.helper.js');

let unit = module.exports = {
    "process": async (message, client) => {
        let onlinePlayers = await dataFetchingTask.start();

        let watchedFactions = await dalFactions.get();
        let factions = watchTransformTask.filter(onlinePlayers, watchedFactions, (watch, player) => {
            return watch.tags.some(tag => player.Name.includes(tag));
        });

        let watchedRegions = await dalRegions.get();
        let regions = watchTransformTask.filter(onlinePlayers, watchedRegions, (watch, player) => {
            return watch.systems.some(system => player.System === system);
        });

        message.channel.send({
            embed: embedHelper.populateScan(onlinePlayers.length, factions, regions)
        });
    }
}