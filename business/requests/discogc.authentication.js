const https = require("https");
const onlinePlayersRequest = require('./discogc.onlineplayers.js');

let unit = module.exports = {
    "send": (discoGCAuthPostData) => {
        const connectionRequestOptions = {
            hostname: 'discoverygc.com',
            port: 443,
            path: '/forums/member.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': discoGCAuthPostData.length
            }
        };

        const connectionRequest = https.request(connectionRequestOptions, (connectionResponse) => {
            if (connectionResponse.statusCode === 200) {
                onlinePlayersRequest.send(connectionResponse.headers["set-cookie"]);
            }
        });

        connectionRequest.write(discoGCAuthPostData);
        connectionRequest.end();
    }
}