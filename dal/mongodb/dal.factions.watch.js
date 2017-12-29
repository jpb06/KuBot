const MongoClient = require("mongodb").MongoClient;

let unit = module.exports = {
    "get": async (guildId) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('factionswatch');

            const result = await collection
                .find({ guildId: guildId })
                .sort({ name: 1 })
                .toArray();

            return result;
        } finally {
            client.close();
        }
    },
    "add": async (identifier, guildId, name, tags, alwaysDisplay) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('factionswatch');

            await collection.findOneAndUpdate(
                { identifier: identifier },
                { identifier: identifier, guildId: guildId, name: name, tags: tags, alwaysDisplay: alwaysDisplay },
                { upsert: true }
            );

        } finally {
            client.close();
        }
    },
    "addRange": async (factions) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('factionswatch');

            await collection.insertMany(factions);
        } finally {
            client.close();
        }
    },
    "remove": async (guildId, identifier) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('factionswatch');

            let deleted = await collection.findOneAndDelete(
                { guildId: guildId, identifier: identifier }
            );

            return deleted.value !== null;

        } finally {
            client.close();
        }
    }
}