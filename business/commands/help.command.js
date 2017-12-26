const embedHelper = require('./../util/embed.helper.js');

let unit = module.exports = {
    "process": (message) => {
        message.channel.send({
            embed: embedHelper.help()
        });
    },
    "processAdmin": (message) => {
        message.channel.send({
            embed: embedHelper.helpAdmin()
        });
    }
}