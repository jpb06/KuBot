const Discord = require('discord.js');
const client = new Discord.Client({
    disableEveryone: true
});

require('./conf/private.settings.js').initialize();
const botSettings = require('./conf/bot.settings.json');
const inviteLink = require('./business/util/invitelink.helper.js');

const helpCommand = require('./business/commands/help.command.js');
const scanCommand = require('./business/commands/scan.command.js');
const watchCommand = require('./business/commands/watch.command.js');
const showCommand = require('./business/commands/show.command.js');

const dalKusari = require('./dal/initializers/dal.kusari.initializer.js');

let initialize = async () => {
    console.log('Initializing...');
    await dalKusari.initialize();
}
initialize();

/* ----------------------------------------------------------------------------------------------- */
client.on('ready', async () => {
    console.log(`I am ready! ${client.user.username} `);

    await client.user.setGame(`Kusari`);

    // if (!process.env.local) {
    //   client.guilds.forEach(guild => {
    //     let channel = guild.channels.find(channel => channel.name === botSettings.defaultChannel);
    //     channel.send({ tts: false, embed: embedHelper.loadedNotification() });
    //   });
    // }

    //inviteLink.generate(client);
});
/* ----------------------------------------------------------------------------------------------- */
client.on('guildCreate', guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    //client.user.setGame(`on ${client.guilds.size} servers`);
});
/* ----------------------------------------------------------------------------------------------- */
client.on('guildDelete', guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    //client.user.setGame(`on ${client.guilds.size} servers`);
});
/* ----------------------------------------------------------------------------------------------- */
client.on('message', async message => {
    if (message.author.bot) return; // not replying to others bots
    if (message.channel.type === 'dm') return; // direct messages should be ignored
    if (!message.content.startsWith(botSettings.prefix)) return; // ignoring messages not starting with command prefix  

    if (message.channel.name === botSettings.defaultChannel ||
        message.channel.name === botSettings.adminChannel) {

        let messageChunks = message.content.slice(botSettings.prefix.length).trim().split(/ +/g);
        let command = messageChunks[0].toLowerCase();
        /* ------------------------------------------------------------------------------------------- 
        help command | !help
        ------------------------------------------------------------------------------------------- */
        if (command === 'help') {
            helpCommand.process(message);
        }
        /* ------------------------------------------------------------------------------------------- 
        scan command | !scan
        ------------------------------------------------------------------------------------------- */
        if (command === 'scan') {
            scanCommand.process(message, client);
        }
        /* ------------------------------------------------------------------------------------------- 
        watch command | !watch <name> <comment>
        ------------------------------------------------------------------------------------------- */
        if (command === 'watch') {
            let args = messageChunks.splice(1);
            watchCommand.process(args, message, client);
        }
        /* ------------------------------------------------------------------------------------------- 
        show command | !show <term>
        ------------------------------------------------------------------------------------------- */
        if (command === 'show') {
            let args = messageChunks.splice(1).join('');
            showCommand.process(args, message, client);
        }

    }
});
/* ----------------------------------------------------------------------------------------------- */
client.login(process.env.apiKey);