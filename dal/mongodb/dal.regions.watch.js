const MongoClient = require("mongodb").MongoClient;

let unit = module.exports = {
    "get": async () => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('regionswatch');

            const result = await collection.find().toArray();

            return result;
        } finally {
            client.close();
        }
    },
    "add": async (identifier, name, systems, alwaysDisplay) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('regionswatch');

            await collection.findOneAndUpdate(
                { identifier: identifier },
                { identifier: identifier, name: name, systems: systems, alwaysDisplay: alwaysDisplay },
                { upsert: true }
            );

        } finally {
            client.close();
        }
    }
}