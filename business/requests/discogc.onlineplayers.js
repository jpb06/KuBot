const https = require("https");
const cookiesHelper = require('./../util/cookies.helper.js');

let unit = module.exports = {
    "send": (cookies) => {
        const onlinePlayersRequestOptions = {
            hostname: 'discoverygc.com',
            port: 443,
            path: '/forums/api_interface.php?action=players_online',
            method: 'GET',
            headers: {
                'Cookie': cookiesHelper.stringify(cookies)
            }
        };
        const onlinePlayersRequest = https.request(onlinePlayersRequestOptions, (onlinePlayersResponse) => {
            var data = [];
            onlinePlayersResponse.on('data', (chunk) => {
                data.push(chunk);
            }).on('end', function () {
                let body = Buffer.concat(data).toString();
                console.log(body);
            });
        });
        onlinePlayersRequest.end();
    }
}