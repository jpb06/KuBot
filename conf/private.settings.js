let unit = module.exports = {
    "initialize": () => {
        let config = {};

        try {
            // case dev local
            let privateSettings = require('./private.config.local.js')
            config.apiKey = privateSettings.env.apiKey;
            config.discogcAuthPostData = privateSettings.env.discogcAuthPostData;
            config.local = true;
        } catch (ex) {
            // case deploy
            config.apiKey = process.env.apiKey;
            config.discogcAuthPostData = process.env.discogcAuthPostData;
            config.local = false;
        }

        return config;
    }
}