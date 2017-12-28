const dalFactions = require("./../mongodb/dal.factions.watch.js");
const dalRegions = require("./../mongodb/dal.regions.watch.js");
const dalPlayers = require("./../mongodb/dal.players.watch.js");

let unit = module.exports = {
    "initialize": async () => {
        dalFactions.add('knf', '93043962100580352', 'Naval Forces', ['[KNF]', 'KDS-'], true);
        dalFactions.add('bd', '93043962100580352', 'Blood Dragons', ['BD|', 'n~}'], false);
        dalFactions.add('ksp', '93043962100580352', 'State Police', ['[KSP]'], false);
        dalFactions.add('gc', '93043962100580352', 'Golden Chrysanthemums', ['GC|'], false);
        dalFactions.add('kishiro', '93043962100580352', 'Kishiro', ['Kishiro|'], false);
        dalFactions.add('samura', '93043962100580352', 'Samura', ['Samura|-'], false);
        dalFactions.add('hogosha', '93043962100580352', 'Hogosha', ['[HA]'], false);

        dalRegions.add('kusari', '93043962100580352', 'Kusari', [
            'Nagano', 'Chugoku', 'Tohoku', 'Rishiri',
            'Tottori', 'Hokkaido', 'Hiroshima',
            'New Tokyo', 'Honshu', 'Kyushu',
            'Shikoku'], true);
        dalRegions.add('libertyborder', '93043962100580352', 'Liberty border', ['Kepler', 'Galileo'], false);
        dalRegions.add('taus', '93043962100580352', 'Taus', ['Tau-29', 'Tau-37', 'Tau-23', 'Tau-44'], false);
        dalRegions.add('sigmas', '93043962100580352', 'Sigmas', ['Sigma-19', 'Sigma-13', 'Sigma-21', 'Sigma-17', 'Okinawa'], false);
    }
}