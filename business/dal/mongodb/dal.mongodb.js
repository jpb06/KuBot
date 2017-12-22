const MongoClient = require("mongodb").MongoClient;

let unit = module.exports = {
    "setOnlinePlayers": async (onlinePlayers) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            await db.dropCollection('onlineplayers');
            let collection = db.collection('onlineplayers');

            await collection.insertMany(onlinePlayers, null);
        } finally {
            client.close();
        }
    },
    "getOnlinePlayersByRegion": async (region) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('onlineplayers');
            const result = await collection.find({ Region: region }).toArray();

            console.log('result: ', result);
        } finally {
            client.close();
        }
    }
}