const schedule = require('node-schedule');

const dalFactions = require('./../dal/mongodb/dal.factions.watch.js');
const dalRegions = require('./../dal/mongodb/dal.regions.watch.js');
const fetchOnlinePlayersTask = require('./../business/tasks/fetch.online.players.js');

const embedHelper = require('./../business/util/embed.helper.js');

let unit = module.exports = {
    "start": async (guildMappings) => {
        try {
            var rule = new schedule.RecurrenceRule();
            rule.minute = new schedule.Range(0, 59, 20);

            schedule.scheduleJob(rule, async () => {

                let onlinePlayers = await fetchOnlinePlayersTask.start();
                let watchedFactions = await dalFactions.getAll();
                let watchedRegions = await dalRegions.getAll();

                guildMappings.forEach(async (guild) => {
                    let guildWatchedFactions = watchedFactions.filter(faction => faction.guildId === guild.id);
                    let guildWatchedRegions = watchedRegions.filter(region => region.guildId === guild.id);
                    let systems = [].concat(...guildWatchedRegions.map(region => region.systems));

                    let markedForEmergency = [];
                    guildWatchedFactions.forEach(faction => {
                        let factionOnlinePlayers = onlinePlayers.filter(player =>
                            faction.tags.some(tag => player.Name.includes(tag)) &&
                            systems.includes(player.System)
                        );

                        if (factionOnlinePlayers.length >= 3) {
                            markedForEmergency.push({
                                name: faction.name,
                                playersCount: factionOnlinePlayers.length
                            });
                        }
                    });

                    if (markedForEmergency.length > 0) {
                        let messages = await guild.emergencyChannel.fetchMessages({
                            limit: 1
                        });

                        if (messages.size > 0) {
                            let message = messages.first();
                            if (message.author.id === process.env.botId) {
                                await message.delete();
                                embedHelper.sendActivityNotice(guild.emergencyChannel, markedForEmergency);
                                return;
                            }
                        }

                        embedHelper.sendActivityNotice(guild.emergencyChannel, markedForEmergency);
                        return;
                    }
                });
            });
        } catch (error) {
            await errorsLogging.save(error);
        }
    }
}