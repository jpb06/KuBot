const moment = require('moment');

const filesHelper = require('./files.helper.js');

let unit = module.exports = {
    "save": async (error) => {
        let desc = `\n-----------------------------\n${moment().format('MM/DD/YYYY HH:mm:ss')}\n${error.stack}`;
        await filesHelper.append('./err.log', desc);
        return true;
    }
}