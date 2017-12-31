const util = require('util');
const fs = require('fs');

const embedHelper = require('./../../business/util/embed.helper.js');
const validator = require('./document.validator.js');
const filesHelper = require('./../../business/util/files.helper.js');

const factionsDal = require('./../../dal/mongodb/dal.factions.watch.js');
const regionsDal = require('./../../dal/mongodb/dal.regions.watch.js');
const guildsDal = require('./../../dal/mongodb/dal.guilds.js');

let unit = module.exports = {
    "persist": async (message) => {
        try {
            let attachment = message.attachments.first();
            let fileExtension = attachment.filename.substr(attachment.filename.lastIndexOf('.') + 1);
            if (fileExtension === 'json') {
                await filesHelper.save(attachment.url, `./dal/initializer/guilds/${message.channel.guild.id}.json`);

                const readFile = util.promisify(fs.readFile);
                let data = await readFile(`./dal/initializer/guilds/${message.channel.guild.id}.json`, 'utf8');
                let parsed = JSON.parse(data);

                let validationErrors = validator.verifyGuildConfig(parsed);

                if (validationErrors.length > 0) {
                    embedHelper.sendInvalidGuildConfig(message.channel, validationErrors);
                    return false;
                } else {
                    await factionsDal.removeForGuild(message.channel.guild.id);
                    await factionsDal.addRange(parsed.factions.map(faction => ({
                        guildId: message.channel.guild.id,
                        identifier: faction.identifier ? faction.identifier : faction.name.replace(/\W/g, ''),
                        name: faction.name,
                        tags: faction.tags,
                        alwaysDisplay: faction.alwaysDisplay ? faction.alwaysDisplay : false
                    })));

                    await regionsDal.removeForGuild(message.channel.guild.id);
                    await regionsDal.addRange(parsed.regions.map(region => ({
                        guildId: message.channel.guild.id,
                        identifier: region.identifier ? region.identifier : region.name.replace(/\W/g, ''),
                        name: region.name,
                        systems: region.systems,
                        alwaysDisplay: region.alwaysDisplay ? region.alwaysDisplay : false
                    })));

                    parsed.guildSettings.guildId = message.channel.guild.id;
                    await guildsDal.set(parsed.guildSettings);

                    embedHelper.sendGuildSettingsInitCompleted(message.channel);
                    return true;
                }
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
        }
    }
}