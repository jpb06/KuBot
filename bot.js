const Discord = require('discord.js');
const client = new Discord.Client({
    disableEveryone: true
});

const privateSettings = require('./conf/private.settings.js').initialize();
const botSettings = require('./conf/bot.settings.json');
const inviteLink = require('./business/util/invitelink.helper.js');

const discoAuthRequest = require('./business/requests/discogc.authentication.js');

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

    discoAuthRequest.send(privateSettings.discogcAuthPostData);
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
client.login(privateSettings.apiKey);