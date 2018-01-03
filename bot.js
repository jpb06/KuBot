const Discord = require('discord.js');
const client = new Discord.Client({
    disableEveryone: true
});

require('./conf/private.settings.js').initialize();
const botSettings = require('./conf/bot.settings.json');

const helpCommand = require('./front/help.command.js');
const scanCommand = require('./front/scan.command.js');
const watchCommand = require('./front/watch.command.js');
const showCommand = require('./front/show.command.js');
const adminRemoveCommand = require('./front/admin.remove.command.js');
const updateGuildConfigTask = require('./front/update.guild.config.task.js');
const guildSubscriptionTask = require('./front/guild.subscription.task.js');
const errorsLogging = require('./business/util/errors.logging.helper.js');
const inviteLink = require('./business/util/invitelink.helper.js');

const dalGuilds = require('./dal/mongodb/dal.guilds.js');

let guildsParameters = [];

let initialize = async () => {
    try {
        guildsParameters = await dalGuilds.get();
        console.log('Initializing...');
    } catch (err) {
        await errorsLogging.save(err);
    }
}
initialize();

/* ----------------------------------------------------------------------------------------------- */
client.on('ready', async () => {
    console.log(`I am ready! ${client.user.username} `);

    await client.user.setGame(`Kusari`);

    // inviteLink.generate(client);
});
/* ----------------------------------------------------------------------------------------------- */
client.on('guildCreate', async guild => {
    guildsParameters = await guildSubscriptionTask.start(guild, guildsParameters);
});
/* ----------------------------------------------------------------------------------------------- */
client.on('guildDelete', guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);

});
/* ----------------------------------------------------------------------------------------------- */
client.on('message', async message => {
    if (message.author.bot) return; // not replying to others bots
    if (message.channel.type === 'dm') return; // direct messages should be ignored

    let guildSettings = guildsParameters.find(guild => guild.guildId === message.guild.id);
    if (!guildSettings) return;

    if (message.content.startsWith(botSettings.prefix)) {
        let messageChunks = message.content.slice(botSettings.prefix.length).trim().split(/ +/g);
        let command = messageChunks[0].toLowerCase();

        /* ------------------------------------------------------------------------------------------- 
        Default + Admin */
        if (message.channel.name === guildSettings.mainChannel ||
            message.channel.name === guildSettings.adminChannel) {
            /* ------------------------------------------------------------------------------------------- 
            help command | !help
            ------------------------------------------------------------------------------------------- */
            if (command === 'help') {
                helpCommand.process(guildSettings, message);
            }
            /* ------------------------------------------------------------------------------------------- 
            scan command | !scan
            ------------------------------------------------------------------------------------------- */
            if (command === 'scan') {
                await scanCommand.process(guildSettings, message, client);
            }
            /* ------------------------------------------------------------------------------------------- 
            watch command | !watch <name> <comment>
            ------------------------------------------------------------------------------------------- */
            if (command === 'watch') {
                let args = messageChunks.splice(1);
                await watchCommand.process(guildSettings, args, message, client);
            }
            /* ------------------------------------------------------------------------------------------- 
            show command | !show <term>
            ------------------------------------------------------------------------------------------- */
            if (command === 'show') {
                let args = messageChunks.splice(1).join('');
                await showCommand.process(guildSettings, args, message, client);
            }
        }

        /* ------------------------------------------------------------------------------------------- 
        Admin */
        if (message.channel.name === guildSettings.adminChannel) {
            /* ------------------------------------------------------------------------------------------- 
            remove command | !remove <target> <term>
            ------------------------------------------------------------------------------------------- */
            if (command === 'remove') {
                let args = messageChunks.splice(1);
                await adminRemoveCommand.process(guildSettings, args, message, client);
            }
            /* ------------------------------------------------------------------------------------------- 
            help command | !help
            ------------------------------------------------------------------------------------------- */
            if (command === 'help') {
                helpCommand.processAdmin(guildSettings, message);
            }
        }
    } else if (message.channel.name === guildSettings.adminChannel && message.attachments.size === 1) {
        /* ------------------------------------------------------------------------------------------- 
            Guild config json upload
            ------------------------------------------------------------------------------------------- */
        guildsParameters = await updateGuildConfigTask.start(message, guildsParameters);
    }
});
/* ----------------------------------------------------------------------------------------------- */
client.login(process.env.apiKey);