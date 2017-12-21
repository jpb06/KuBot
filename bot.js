const Discord = require('discord.js');
const client = new Discord.Client({
    disableEveryone: true
});

let apiKey = '';
let discoGCAuthPostData = '';
let local = false;

try {
    // case dev local
    let privateSettings = require('./conf/private.config.local.js')
    apiKey = privateSettings.env.apiKey;
    discoGCAuthPostData = privateSettings.env.discoGCAuthPostData;
    local = true;
} catch (ex) {
    // case deploy
    apiKey = process.env.apiKey;
    discoGCAuthPostData = process.env.discoGCAuthPostData;
}

const botSettings = require('./conf/bot.settings.json');

const inviteLink = require('./business/util/invitelink.helper.js');
const cookiesHelper = require('./business/util/cookies.helper.js');

const https = require("https");

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

    // let c = ['mybb[lastvisit]=xxx; expires=Fri, 21-Dec-2018 09:07:04 GMT; path=/forums/; domain=.discoverygc.com; Secure',
    //     'mybb[lastactive]=xxx; expires=Fri, 21-Dec-2018 09:07:04 GMT; path=/forums/; domain=.discoverygc.com; Secure',
    //     'sid=xxx; path=/forums/; domain=.discoverygc.com; HttpOnly; Secure',
    //     'loginattempts=xxx; expires=Fri, 21-Dec-2018 09:07:04 GMT; path=/forums/; domain=.discoverygc.com; Secure',
    //     'sid=xxx; path=/forums/; domain=.discoverygc.com; HttpOnly; Secure',
    //     'mybbuser=xxx; expires=Fri, 21-Dec-2018 09:07:04 GMT; path=/forums/; domain=.discoverygc.com; HttpOnly; Secure'];
    // let cookies = cookiesHelper.parse(c);
    // // console.log(c['sid']);
    // // console.log(c['mybb[lastvisit]']);
    // console.log(cookies.join(';'));

    const connectionRequestOptions = {
        hostname: 'discoverygc.com',
        port: 443,
        path: '/forums/member.php',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': discoGCAuthPostData.length
        }
    };

    const connectionRequest = https.request(connectionRequestOptions, (connectionResponse) => {
        if (connectionResponse.statusCode === 200) {
            let cookies = cookiesHelper.parse(connectionResponse.headers["set-cookie"]).join(';');
            console.log('cookies:', cookies);

            const onlinePlayersRequestOptions = {
                hostname: 'discoverygc.com',
                port: 443,
                path: '/forums/api_interface.php?action=players_online',
                method: 'GET',
                headers: {
                    'Cookie': cookies
                }
            };
            const onlinePlayersRequest = https.request(onlinePlayersRequestOptions, (onlinePlayersResponse) => {
                console.log('status code:', connectionResponse.statusCode);

                var data = [];
                onlinePlayersResponse.on('data', (chunk) => {
                    data.push(chunk);
                }).on('end', function () {
                    let body = Buffer.concat(data).toString();
                    console.log(body);
                });
            });
            onlinePlayersRequest.end();
        }
    });

    connectionRequest.write(discoGCAuthPostData);
    connectionRequest.end();

    // ---------------------------------------------

    // // req.on('error', (e) => {
    // //     console.error(e);
    // // });

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