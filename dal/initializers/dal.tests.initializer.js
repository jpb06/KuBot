const dalFactions = require("./../mongodb/dal.factions.watch.js");
const dalRegions = require("./../mongodb/dal.regions.watch.js");
const dalPlayers = require("./../mongodb/dal.players.watch.js");

let unit = module.exports = {
    "initialize": async () => {
        dalFactions.add('ln', '350303355014479874', 'Liberty Navy', ['[LN]', 'LNS-', '5th|'], true);
        dalFactions.add('harmony', '350303355014479874', 'Battlegroup Harmony', ['H|-'], false);
        dalFactions.add('lanehackers', '350303355014479874', 'Lane Hackers', ['LH~'], false);
        dalFactions.add('dss', '350303355014479874', 'Deep Space Solutions', ['|=DSS=|'], false);
        dalFactions.add('order', '350303355014479874', 'The Order', ['Order|'], false);
        dalFactions.add('hellfire', '350303355014479874', 'Hellfire Legion', ['[HF]'], false);
        dalFactions.add('ic', '350303355014479874', 'Interspace Commerce', ['IC|'], false);
        dalFactions.add('grn', '350303355014479874', 'Gallic Royal Navy', ['MRG|', 'RNS-'], false);
        dalFactions.add('ageira', '350303355014479874', 'Ageira Innovations', ['Ageira~'], false);
        dalFactions.add('lr', '350303355014479874', 'Liberty Rogues', ['LR-'], false);
        dalFactions.add('lpi', '350303355014479874', 'Liberty Police Incorporated', ['LPI-'], false);
        dalFactions.add('lsf', '350303355014479874', 'Liberty Security Force', ['=LSF='], false);

        dalRegions.add('liberty', '350303355014479874', 'Liberty', [
            'Alberta', 'Colorado', 'Alaska',
            'Ontario', 'New York', 'Virginia', 'New Hampshire',
            'California', 'Pennsylvania', 'Texas', 'Puerto Rico',
            'Kansas'], true);
        dalRegions.add('kusariborder', '350303355014479874', 'Kusari border', ['Kepler', 'Galileo'], false);
        dalRegions.add('bretoniaborder', '350303355014479874', 'Bretonia border', ['Vespucci', 'Magellan', 'Cortez', 'Inverness'], false);
        dalRegions.add('rheinlandborder', '350303355014479874', 'Rheinland border', ['Bering', 'Hudson'], false);
    }
}