const MongoClient = require("mongodb").MongoClient;

let unit = module.exports = {
    "get": async () => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('guilds');

            const result = await collection.find().toArray();

            return result;
        } finally {
            client.close();
        }
    },
    "getOne": async (guildId) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('guilds');

            const result = await collection.find({ guildId: guildId }).toArray();

            return result[0];
        } finally {
            client.close();
        }
    },
    "create": async (guildSettings) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('guilds');

            await collection.insertOne(guildSettings);
        } finally {
            client.close();
        }
    },
    "set": async (guildSettings) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('guilds');

            await collection.findOneAndUpdate(
                { guildId: guildId },
                {
                    guildId: guildSettings.guildId,
                    messagesImage: messagesImage,
                    messagesFooterName: messagesFooterName,
                    scanMainRegionName: scanMainRegionName,
                    mainChannel: mainChannel,
                    adminChannel: adminChannel,
                    acknowledged: acknowledged
                },
                { upsert: true }
            );
        } finally {
            client.close();
        }
    }
}