const dataFetchingTask = require('./../tasks/fetch.online.players.task.js');
const embedHelper = require('./../util/embed.helper.js');

let unit = module.exports = {
    "process": async (message, client) => {
        let onlinePlayers = await dataFetchingTask.start();

        let factions = [];
        factions.push({ name: '[KNF]', count: onlinePlayers.filter(player => player.Name.includes('[KNF]')).length });

        let bdFaction = onlinePlayers.filter(player =>
            player.Name.includes('BD|') ||
            player.Name.includes('n~}')).length;
        if (bdFaction > 0)
            factions.push({ name: 'Blood Dragons', count: bdFaction });
        let gcFaction = onlinePlayers.filter(player =>
            player.Name.includes('GC|')).length;
        if (gcFaction > 0)
            factions.push({ name: 'Golden Chrysanthemums', count: gcFaction });
        let samuraFaction = onlinePlayers.filter(player =>
            player.Name.includes('Samura|-')).length;
        if (samuraFaction > 0)
            factions.push({ name: 'Samura', count: samuraFaction });
        let kishiroFaction = onlinePlayers.filter(player =>
            player.Name.includes('Kishiro|')).length;
        if (kishiroFaction > 0)
            factions.push({ name: 'Kishiro', count: kishiroFaction });
        let hogoshaFaction = onlinePlayers.filter(player =>
            player.Name.includes('[HA]')).length;
        if (hogoshaFaction > 0)
            factions.push({ name: 'Hogosha', count: hogoshaFaction });

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