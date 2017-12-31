const https = require('https');
const fs = require('fs');

let unit = module.exports = {
    "save": (url, dest) => {
        return new Promise((resolve, reject) => {
            var file = fs.createWriteStream(dest);

            var request = https.get(url, function (response) {
                response.pipe(file);
                file.on('finish', function () {
                    file.end();
                    resolve();
                });
            }).on('error', function (err) {
                file.end();
                fs.unlink(dest); // Delete the file async. (But we don't check the result)
                reject(err);
            });
        });
    },
    "delete": (path) => {
        fs.unlink(path, function (err) {
            return new Promise((resolve, reject) => {
                if (err) {
                    reject(err);
                }

                resolve();
            });
        });
    }
}