const https = require("https");
const cookiesHelper = require('./../util/cookies.helper.js');

let unit = module.exports = {
    "send": (cookies) => {
        return new Promise((resolve, reject) => {
            const requestOptions = {
                hostname: 'discoverygc.com',
                port: 443,
                path: '/forums/api_interface.php?action=players_online',
                method: 'GET',
                headers: {
                    'Cookie': cookiesHelper.stringify(cookies)
                }
            };
            const request = https.request(requestOptions, (response) => {
                var buffer = [];

                response.on('data', (chunk) => buffer.push(chunk));
                response.on('end', function () {
                    let body = buffer.join('');

                    // dirty
                    let content = body.substring(body.indexOf('<!-- start: api_playersonline -->'));
                    content = content.substring(content.indexOf('JSON.parse') + 12);
                    content = content.substring(0, content.indexOf('");</script>'));

                    resolve(content);
                });

            });
            request.on('error', (error) => reject(error));

            request.end();
        });
    }
}