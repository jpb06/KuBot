let unit = module.exports = {
    "initialize": () => {
        try {
            // case dev local
            let privateSettings = require('./private.config.local.js');
            process.env.apiKey = privateSettings.env.apiKey;
            process.env.botId = privateSettings.env.botId;
            process.env.discogcAuthPostData = privateSettings.env.discogcAuthPostData;
            process.env.mongodbUrl = privateSettings.env.mongodbUrl;
            process.env.mongodbBase = privateSettings.env.mongodbBase;
            process.env.local = true;
        } catch (ex) {
            // case deploy
        }
    }
}