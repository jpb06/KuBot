const MongoClient = require("mongodb").MongoClient;

let unit = module.exports = {
    "get": async () => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('playerswatch');

            const result = await collection.find().toArray();

            return result;
        } finally {
            client.close();
        }
    },
    "add": async (name, comment) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('playerswatch');

            await collection.findOneAndUpdate(
                { name: name },
                { name: name, comment: comment },
                { upsert: true }
            );

        } finally {
            client.close();
        }
    },
    "remove": async (name) => {
        const client = await MongoClient.connect(process.env.mongodbUrl);
        let db = client.db(process.env.mongodbBase);

        try {
            let collection = db.collection('playerswatch');

            let deleted = await collection.findOneAndDelete(
                { name: name }
            );

            return deleted.value !== null;
        } catch (err) {
            console.log(err);
        } finally {
            client.close();
        }
    }
}