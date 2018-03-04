const MongoClient = require("mongodb").MongoClient;

let unit = module.exports = {
    "getAll": async () => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('activitystatuscache');

            const result = await collection
                .find()
                .toArray();

            return result;
        } finally {
            client.close();
        }
    },
    "get": async (guildId) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('activitystatuscache');

            const result = await collection
                .find({
                    GuildId: guildId
                })
                .toArray();

            return result;
        } finally {
            client.close();
        }
    },
    "set": async (activityCache) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('activitystatuscache');

            await collection.deleteMany();
            await collection.insertMany(activityCache);
        } finally {
            client.close();
        }
    }
}