const MongoClient = require("mongodb").MongoClient;

let unit = module.exports = {
    "get": async () => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('factionswatch');

            const result = await collection.find().toArray();

            return result;
        } finally {
            client.close();
        }
    },
    "add": async (identifier, name, tags, alwaysDisplay) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('factionswatch');

            await collection.findOneAndUpdate(
                { identifier: identifier },
                { identifier: identifier, name: name, tags: tags, alwaysDisplay: alwaysDisplay },
                { upsert: true }
            );

        } finally {
            client.close();
        }
    },
    "remove": async (identifier) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('factionswatch');

            let deleted = await collection.findOneAndDelete(
                { identifier: identifier }
            );

            return deleted.value !== null;

        } finally {
            client.close();
        }
    }
}