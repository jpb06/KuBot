const schedule = require('node-schedule');

const dalFactions = require('./../dal/mongodb/dal.factions.watch.js');
const dalRegions = require('./../dal/mongodb/dal.regions.watch.js');
const dalFactionsActivityCache = require('./../dal/mongodb/dal.activity.status.cache.js');

const fetchOnlinePlayersTask = require('./../business/tasks/fetch.online.players.js');

const embedHelper = require('./../business/util/embed.helper.js');
const errorsLogging = require('./../business/util/errors.logging.helper.js');

let unit = module.exports = {
    "asyncForEach": async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    },
    "start": async (guildMappings) => {
        try {
            var rule = new schedule.RecurrenceRule();
            rule.minute = new schedule.Range(0, 59, 20);

            schedule.scheduleJob(rule, async () => {

                let onlinePlayers = await fetchOnlinePlayersTask.start();
                let watchedFactions = await dalFactions.getAll();
                let watchedRegions = await dalRegions.getAll();

                let activityCache = await dalFactionsActivityCache.getAll();

                let updatedCache = [];

                await unit.asyncForEach(guildMappings, async (guild) => {
                    let guildWatchedFactions = watchedFactions
                        .filter(faction => faction.guildId === guild.id)
                        .sort((a, b) => {
                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;
                            return 0;
                        });
                    let guildWatchedRegions = watchedRegions.filter(region => region.guildId === guild.id);
                    let systems = [].concat(...guildWatchedRegions.map(region => region.systems));

                    let markedForEmergency = [];
                    guildWatchedFactions.forEach(faction => {
                        let factionOnlinePlayers = onlinePlayers.filter(player =>
                            faction.tags.some(tag => player.Name.includes(tag)) &&
                            systems.includes(player.System)
                        );

                        if (factionOnlinePlayers.length >= 2) {
                            markedForEmergency.push({
                                name: faction.name,
                                playersCount: factionOnlinePlayers.length
                            });
                        }
                    });

                    let guildActivityCache = activityCache.filter(cache => cache.GuildId === guild.id);

                    let similar = false;
                    if (guildActivityCache.length === 1)
                        similar = await unit.compareActivity(guildActivityCache[0].Cache, markedForEmergency);

                    if (markedForEmergency.length > 0 && !similar) {
                        let messageSent = false;
                        let messages = await guild.emergencyChannel.fetchMessages({
                            limit: 1
                        });

                        if (messages.size > 0) {
                            let message = messages.first();
                            if (message.author.id === process.env.botId) {
                                await message.delete();
                                embedHelper.sendActivityNotice(guild.emergencyChannel, markedForEmergency);
                                messageSent = true;
                            }
                        }

                        if (!messageSent)
                            embedHelper.sendActivityNotice(guild.emergencyChannel, markedForEmergency);
                    }

                    updatedCache.push({
                        GuildId: guild.id,
                        Cache: markedForEmergency
                    });
                });

                await dalFactionsActivityCache.set(updatedCache);
            });
        } catch (error) {
            await errorsLogging.save(error);
        }
    },
    "compareActivity": async (activityInCache, activityFetched) => {
        if (activityInCache.length !== activityFetched.length) return false;

        let index = 0;
        activityInCache.forEach(cachedFaction => {
            let fetchedFaction = activityFetched[index];

            if (fetchedFaction.name !== cachedFaction.name ||
                fetchedFaction.playersCount !== cachedFaction.playersCount)
                return false;

            index++;
        });

        return true;
    }
}