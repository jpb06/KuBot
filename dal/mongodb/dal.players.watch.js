const MongoClient = require("mongodb").MongoClient;

let unit = module.exports = {
    "get": async (guildId) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('playerswatch');

            const result = await collection
                .find({ guildId: guildId })
                .sort({ name: 1 })
                .toArray();

            return result;
        } finally {
            client.close();
        }
    },
    "add": async (guildId, name, comment) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('playerswatch');

            await collection.findOneAndUpdate(
                { name: name },
                { guildId: guildId, name: name, comment: comment },
                { upsert: true }
            );

        } finally {
            client.close();
        }
    },
    "remove": async (guildId, name) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('playerswatch');

            let deleted = await collection.findOneAndDelete(
                { guildId: guildId, name: name }
            );

            return deleted.value !== null;
        } catch (err) {
            console.log(err);
        } finally {
            client.close();
        }
    }
}