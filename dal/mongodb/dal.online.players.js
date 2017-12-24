const MongoClient = require("mongodb").MongoClient;

let unit = module.exports = {
    "set": async (onlinePlayers) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('onlineplayers');

            await collection.deleteMany();
            await collection.insertMany(onlinePlayers, null);
        } finally {
            client.close();
        }
    },
    "get": async () => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('onlineplayers');
            const result = await collection.find().toArray();

            return result;
        } finally {
            client.close();
        }
    },
    "getByRegion": async (region) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('onlineplayers');
            const result = await collection.find({ Region: region }).toArray();

            return result;
        } finally {
            client.close();
        }
    }
}