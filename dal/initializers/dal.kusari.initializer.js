const dalFactions = require("./../mongodb/dal.factions.watch.js");

let unit = module.exports = {
    "initialize": async () => {
        dalFactions.add('knf', '[KNF]', ['[KNF]'], true);
        dalFactions.add('bd', 'Blood dragons', ['BD|', 'n~}'], false);
        dalFactions.add('gc', 'Golden Chrysanthemums', ['GC|'], false);
        dalFactions.add('kishiro', 'Kishiro', ['Kishiro|'], false);
        dalFactions.add('samura', 'Samura', ['Samura|-'], false);
        dalFactions.add('hogosha', 'Hogosha', ['[HA]'], false);
    }
}