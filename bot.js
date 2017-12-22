const Discord = require('discord.js');
const client = new Discord.Client({
    disableEveryone: true
});

require('./conf/private.settings.js').initialize();
const botSettings = require('./conf/bot.settings.json');
const inviteLink = require('./business/util/invitelink.helper.js');

const discoAuthRequest = require('./business/requests/discogc.authentication.js');

const mongo = require('./business/dal/mongodb/dal.mongodb.js');

// for stand alone tests
let tests = async () => {
    let json = '{\"Error\":null,\"Players\":[{\"Time\":\"2h23\",\"Name\":\"ITC|Explorer_S1\",\"System\":\"Omicron Gamma\",\"Region\":\"South Edge Worlds\",\"Ping\":322},{\"Time\":\"1h46\",\"Name\":\"Rhino_Mk.1\",\"System\":\"Pennsylvania\",\"Region\":\"Liberty Space\",\"Ping\":179},{\"Time\":\"1h34\",\"Name\":\"Universe\",\"System\":\"Kansas\",\"Region\":\"Independent Worlds\",\"Ping\":40},{\"Time\":\"1h30\",\"Name\":\"Infel\",\"System\":\"New York\",\"Region\":\"Liberty Space\",\"Ping\":235},{\"Time\":\"1h11\",\"Name\":\"ESCORT_Renegade\",\"System\":\"Alberta\",\"Region\":\"Liberty Space\",\"Ping\":93},{\"Time\":\"57m\",\"Name\":\"House.Fenix|C.M.T.\",\"System\":\"New Tokyo\",\"Region\":\"Kusari Space\",\"Ping\":0},{\"Time\":\"57m\",\"Name\":\"KT|Haruna\",\"System\":\"Kepler\",\"Region\":\"Independent Worlds\",\"Ping\":32},{\"Time\":\"56m\",\"Name\":\"Captain.Brownbeard\",\"System\":\"Omicron Beta\",\"Region\":\"North Edge Worlds\",\"Ping\":46},{\"Time\":\"53m\",\"Name\":\"RHB-Nidhogg\",\"System\":\"Dresden\",\"Region\":\"Rheinland Space\",\"Ping\":48},{\"Time\":\"53m\",\"Name\":\"RHC-Skadi\",\"System\":\"Dresden\",\"Region\":\"Rheinland Space\",\"Ping\":285},{\"Time\":\"49m\",\"Name\":\"CryHavok\",\"System\":\"New York\",\"Region\":\"Liberty Space\",\"Ping\":57},{\"Time\":\"47m\",\"Name\":\"DWR|WTS-Zuflucht\",\"System\":\"Hamburg\",\"Region\":\"Rheinland Space\",\"Ping\":40},{\"Time\":\"43m\",\"Name\":\"Jerry\",\"System\":\"Okinawa\",\"Region\":\"Sigma Border Worlds\",\"Ping\":68},{\"Time\":\"42m\",\"Name\":\"Domino\",\"System\":\"Dresden\",\"Region\":\"Rheinland Space\",\"Ping\":98},{\"Time\":\"41m\",\"Name\":\"GMS|Marcel.Istres\",\"System\":\"Ile-de-France\",\"Region\":\"Gallia Space\",\"Ping\":31},{\"Time\":\"41m\",\"Name\":\"DWR|WTS-Malteser\",\"System\":\"Frankfurt\",\"Region\":\"Rheinland Space\",\"Ping\":80},{\"Time\":\"40m\",\"Name\":\"PaintedBird\",\"System\":\"Bering\",\"Region\":\"Independent Worlds\",\"Ping\":48},{\"Time\":\"40m\",\"Name\":\"Traficante\",\"System\":\"Galileo\",\"Region\":\"Independent Worlds\",\"Ping\":153},{\"Time\":\"39m\",\"Name\":\"Vlad\",\"System\":\"Kepler\",\"Region\":\"Independent Worlds\",\"Ping\":56},{\"Time\":\"38m\",\"Name\":\"Starclaw\",\"System\":\"Colorado\",\"Region\":\"Liberty Space\",\"Ping\":67},{\"Time\":\"33m\",\"Name\":\"AloneWolf\",\"System\":\"Drake\",\"Region\":\"Nomad Worlds\",\"Ping\":79},{\"Time\":\"30m\",\"Name\":\"--Gordon_F--\",\"System\":\"Tau-23\",\"Region\":\"Tau Border Worlds\",\"Ping\":32},{\"Time\":\"30m\",\"Name\":\"FORA_DA_LEI\",\"System\":\"Pennsylvania\",\"Region\":\"Liberty Space\",\"Ping\":277},{\"Time\":\"26m\",\"Name\":\"Zillion[BE]\",\"System\":\"Pennsylvania\",\"Region\":\"Liberty Space\",\"Ping\":28},{\"Time\":\"23m\",\"Name\":\"JanTwardy\",\"System\":\"New York\",\"Region\":\"Liberty Space\",\"Ping\":104},{\"Time\":\"20m\",\"Name\":\"Infernus-Legione\",\"System\":\"Roussillon\",\"Region\":\"Tau Border Worlds\",\"Ping\":954},{\"Time\":\"20m\",\"Name\":\"Norton\",\"System\":\"New York\",\"Region\":\"Liberty Space\",\"Ping\":601},{\"Time\":\"16m\",\"Name\":\"Schrade\",\"System\":\"Lorraine\",\"Region\":\"Gallic Border Worlds\",\"Ping\":49},{\"Time\":\"16m\",\"Name\":\"Suport\",\"System\":\"Honshu\",\"Region\":\"Kusari Space\",\"Ping\":93},{\"Time\":\"15m\",\"Name\":\"Lucas_Meyer\",\"System\":\"Frankfurt\",\"Region\":\"Rheinland Space\",\"Ping\":55},{\"Time\":\"10m\",\"Name\":\"Scoby_crapy\",\"System\":\"Leeds\",\"Region\":\"Bretonia Space\",\"Ping\":177},{\"Time\":\"8m\",\"Name\":\"Uncle.Nuclear\",\"System\":\"Kansas\",\"Region\":\"Independent Worlds\",\"Ping\":36},{\"Time\":\"8m\",\"Name\":\"Anubys\",\"System\":\"Ile-de-France\",\"Region\":\"Gallia Space\",\"Ping\":389},{\"Time\":\"8m\",\"Name\":\"NC-ET-Meadowlands\",\"System\":\"Omicron Beta\",\"Region\":\"North Edge Worlds\",\"Ping\":38},{\"Time\":\"8m\",\"Name\":\"GMG|Karl:Lee\",\"System\":\"Honshu\",\"Region\":\"Kusari Space\",\"Ping\":254},{\"Time\":\"7m\",\"Name\":\"KuCorpSamura\",\"System\":\"Tau-37\",\"Region\":\"Tau Border Worlds\",\"Ping\":100},{\"Time\":\"7m\",\"Name\":\"Kruger|-KMS-Elten\",\"System\":\"New Berlin\",\"Region\":\"Rheinland Space\",\"Ping\":47},{\"Time\":\"7m\",\"Name\":\"Bybor_De_Banga\",\"System\":\"Pennsylvania\",\"Region\":\"Liberty Space\",\"Ping\":69},{\"Time\":\"7m\",\"Name\":\"Main.Attraction\",\"System\":\"New York\",\"Region\":\"Liberty Space\",\"Ping\":47},{\"Time\":\"7m\",\"Name\":\"Ta\'Lon\",\"System\":\"New York\",\"Region\":\"Liberty Space\",\"Ping\":113},{\"Time\":\"3m\",\"Name\":\"Codeguns-For-Sale\",\"System\":\"Connecticut\",\"Region\":\"Uncharted Space\",\"Ping\":89},{\"Time\":\"3m\",\"Name\":\"Porkchop-Express\",\"System\":\"Stuttgart\",\"Region\":\"Rheinland Space\",\"Ping\":357},{\"Time\":\"1m\",\"Name\":\"Ishikawa.Masako\",\"System\":\"Pennsylvania\",\"Region\":\"Liberty Space\",\"Ping\":66},{\"Time\":\"0m\",\"Name\":\"Mizar.Slug\",\"System\":\"Bastille\",\"Region\":\"Uncharted Space\",\"Ping\":55}],\"Timestamp\":\"2017-12-21T14:47:01\"}';
    let parsed = JSON.parse(json);

    await mongo.setOnlinePlayers(parsed.Players);
    await mongo.getOnlinePlayersByRegion('Kusari Space');
};
tests();

/* ----------------------------------------------------------------------------------------------- */
client.on('ready', async () => {
    console.log(`I am ready! ${client.user.username} `);

    await client.user.setGame(`Kusari`);

    // if (!process.env.local) {
    //   client.guilds.forEach(guild => {
    //     let channel = guild.channels.find(channel => channel.name === botSettings.defaultChannel);
    //     channel.send({ tts: false, embed: embedHelper.populateLoadedNotification() });
    //   });
    // }

    //inviteLink.generate(client);
    // ----------------------------------------------------------------------------------------------

    // discoAuthRequest.send();
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
//client.login(process.env.apiKey);