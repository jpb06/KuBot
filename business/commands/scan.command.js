const dalFactions = require('./../../dal/mongodb/dal.factions.watch.js');

const dataFetchingTask = require('./../tasks/fetch.online.players.task.js');
const embedHelper = require('./../util/embed.helper.js');

let unit = module.exports = {
    "process": async (message, client) => {
        let onlinePlayers = await dataFetchingTask.start();

        let factions = [];
        let watchedFactions = await dalFactions.get();
        watchedFactions.forEach(faction => {
            let count = onlinePlayers.filter(player => faction.tags.some(tag => player.Name.includes(tag))).length;

            if (faction.alwaysDisplay || count > 0) {
                factions.push({ name: faction.name, count: count });
            }
        });

        let regions = [];
        regions.push({ name: 'Kusari', count: onlinePlayers.filter(player => player.Region == 'Kusari Space').length });

        let libertyBorderCount = onlinePlayers.filter(player =>
            player.System == 'Kepler' ||
            player.System == 'Galileo').length;
        if (libertyBorderCount > 0)
            regions.push({ name: 'Liberty border', count: libertyBorderCount });

        let tausBorderCount = onlinePlayers.filter(player =>
            player.System == 'Tau-29' ||
            player.System == 'Tau-23' ||
            player.System == 'Tau-37' ||
            player.System == 'Tau-44').length;
        if (tausBorderCount > 0)
            regions.push({ name: 'Taus border', count: tausBorderCount });

        let sigmasBorderCount = onlinePlayers.filter(player =>
            player.System == 'Sigma-19' ||
            player.System == 'Sigma-13' ||
            player.System == 'Sigma-21' ||
            player.System == 'Sigma-17' ||
            player.System == 'Okinawa').length;
        if (sigmasBorderCount > 0)
            regions.push({ name: 'Sigmas border', count: sigmasBorderCount });

        message.channel.send({
            embed: embedHelper.populateScan(onlinePlayers.length, factions, regions)
        });
    }
}