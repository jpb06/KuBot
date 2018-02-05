const moment = require('moment');

const discoAuthRequest = require('./../requests/discogc.authentication.js');
const discoOnlinePlayersRequest = require('./../requests/discogc.online.players.js');

const onlinePlayersDal = require('./../../dal/mongodb/dal.online.players.js');
const lastFetchDal = require('./../../dal/mongodb/dal.last.fetch.js');

let unit = module.exports = {
    "start": async () => {
        let lastFetch = await lastFetchDal.get('onlineplayers');
        let now = moment();

        // request threshold to discogc = 2 minutes 
        if (!lastFetch || moment(lastFetch.date).add(2, 'm').isBefore(now)) {
            let cookies = await discoAuthRequest.send();
            let data = await discoOnlinePlayersRequest.send(cookies);

            // ??? why escaped quotes
            let cleaned = '';
            let online = '';
            try {
                cleaned = data.replace(/\\"/g, '"')
                    .replace(/\\\\\\\\/g, '\\\\')
                    .replace(/\\"/g, '\"');
                online = JSON.parse(cleaned);

            } catch (err) {
                console.log(err);
                console.log(cleaned);
            }

            await onlinePlayersDal.set(online.Players);
            await lastFetchDal.set('onlineplayers', moment().format());

            return online.Players;
        } else {
            let onlinePlayers = await onlinePlayersDal.get();
            return onlinePlayers;
        }
    }
}