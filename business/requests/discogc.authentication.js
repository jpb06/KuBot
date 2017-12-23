const https = require("https");

let unit = module.exports = {
    "send": () => {
        return new Promise((resolve, reject) => {
            const requestOptions = {
                hostname: 'discoverygc.com',
                port: 443,
                path: '/forums/member.php',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': process.env.discogcAuthPostData.length
                }
            };

            const request = https.request(requestOptions, (response) => {
                if (response.statusCode === 200) {
                    resolve(response.headers["set-cookie"]);
                } else {
                    reject(response.statusCode);
                }
            });
            request.on('error', (error) => reject(error));

            request.write(process.env.discogcAuthPostData);
            request.end();
        });
    }
}