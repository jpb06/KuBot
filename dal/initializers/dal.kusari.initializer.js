const dalFactions = require("./../mongodb/dal.factions.watch.js");
const dalRegions = require("./../mongodb/dal.regions.watch.js");
const dalPlayers = require("./../mongodb/dal.players.watch.js");

let unit = module.exports = {
    "initialize": async () => {
        dalFactions.add('knf', '[KNF]', ['[KNF]'], true);
        dalFactions.add('bd', 'Blood dragons', ['BD|', 'n~}'], false);
        dalFactions.add('gc', 'Golden Chrysanthemums', ['GC|'], false);
        dalFactions.add('kishiro', 'Kishiro', ['Kishiro|'], false);
        dalFactions.add('samura', 'Samura', ['Samura|-'], false);
        dalFactions.add('hogosha', 'Hogosha', ['[HA]'], false);

        dalRegions.add('kusari', 'Kusari', [
            'Nagano', 'Chugoku', 'Tohoku', 'Rishiri',
            'Tottori', 'Hokkaido', 'Hiroshima',
            'New Tokyo', 'Honshu', 'Kyushu',
            'Shikoku'], true);
        dalRegions.add('libertyborder', 'Liberty border', ['Kepler', 'Galileo'], false);
        dalRegions.add('taus', 'Taus', ['Tau-29', 'Tau-37', 'Tau-23', 'Tau-44'], false);
        dalRegions.add('sigmas', 'Sigmas', ['Sigma-19', 'Sigma-13', 'Sigma-21', 'Sigma-17', 'Okinawa'], false);
    }
}