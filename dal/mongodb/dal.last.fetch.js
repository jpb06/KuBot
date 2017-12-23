const MongoClient = require("mongodb").MongoClient;

let unit = module.exports = {
    "set": async (time) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            await db.dropCollection('lastfetch');
            let collection = db.collection('lastfetch');

            await collection.insertOne({ date: time }, null);
        } finally {
            client.close();
        }
    },
    "get": async () => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('lastfetch');
            const result = await collection.find().toArray();

            return result[0];
        } finally {
            client.close();
        }
    }
}