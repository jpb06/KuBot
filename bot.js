const Discord = require('discord.js');
const client = new Discord.Client({
    disableEveryone: true
});

let apiKey = '';
let discogcAuthPostData = '';
let local = false;

try {
    // case dev local
    let privateSettings = require('./conf/private.config.local.js')
    apiKey = privateSettings.env.apiKey;
    discogcAuthPostData = privateSettings.env.discogcAuthPostData;
    local = true;
} catch (ex) {
    // case deploy
    apiKey = process.env.apiKey;
    discogcAuthPostData = process.env.discogcAuthPostData;
}

const botSettings = require('./conf/bot.settings.json');
const inviteLink = require('./business/util/invitelink.helper.js');

/* ----------------------------------------------------------------------------------------------- */
client.on('ready', async () => {
    console.log(`I am ready! ${client.user.username} `);

    await client.user.setGame(`Kusari`);

    // if (!local) {
    //   client.guilds.forEach(guild => {
    //     let channel = guild.channels.find(channel => channel.name === botSettings.defaultChannel);
    //     channel.send({ tts: false, embed: embedHelper.populateLoadedNotification() });
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

    if (message.channel.name === botSettings.defaultChannel ||
        message.channel.name === botSettings.adminChannel) {

        if (!message.content.startsWith(botSettings.prefix)) return; // ignoring messages not starting with command prefix  

        console.log(message.content);
    }
});
/* ----------------------------------------------------------------------------------------------- */
client.login(apiKey);