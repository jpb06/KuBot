const MongoClient = require("mongodb").MongoClient;

let unit = module.exports = {
    "get": async (guildId) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('regionswatch');

            const result = await collection.find({ guildId: guildId }).toArray();

            return result;
        } finally {
            client.close();
        }
    },
    "add": async (identifier, guildId, name, systems, alwaysDisplay) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('regionswatch');

            await collection.findOneAndUpdate(
                { identifier: identifier },
                { identifier: identifier, guildId: guildId, name: name, systems: systems, alwaysDisplay: alwaysDisplay },
                { upsert: true }
            );

        } finally {
            client.close();
        }
    },
    "addRange": async (regions) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('regionswatch');

            await collection.insertMany(regions);
        } finally {
            client.close();
        }
    }
}