const MongoClient = require("mongodb").MongoClient;

let unit = module.exports = {
    "set": async (target, time) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('lastfetch');

            await collection.findOneAndUpdate(
                { target: target },
                { target: target, date: time },
                { upsert: true });
        } finally {
            client.close();
        }
    },
    "get": async (target) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('lastfetch');
            const result = await collection.find({ target: target }).toArray();

            return result[0];
        } finally {
            client.close();
        }
    }
}