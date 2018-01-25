const moment = require('moment');

const filesHelper = require('./files.helper.js');

let unit = module.exports = {
    "save": async (error) => {
        let desc = `\r\n-----------------------------\r\n${moment().format('MM/DD/YYYY HH:mm:ss')}\r\n${error.stack}`;
        await filesHelper.append('./err.log', desc);
        return true;
    }
}