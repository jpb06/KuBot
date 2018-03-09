const argumentsValidation = require('./../business/commands/arguments.validation.js');
const embedHelper = require('./../business/util/embed.helper.js');
const errorsLogging = require('./../business/util/errors.logging.helper.js');
const commandsDescriptions = require('./../business/commands/commands.description.js');

let unit = module.exports = {
    "processMessage": async (guildSettings, args, message, client) => {
        try {
            embedHelper.setup(message.channel, guildSettings, client.user.username, client.user.avatarURL);
            let errors = argumentsValidation.checkQuoteMessageArgs(args);

            if (errors.length > 0) {
                embedHelper.sendValidationError(commandsDescriptions.quoteUsage(), errors);
            } else {
                if (message.channel.type === 'text') {
                    let messageToQuote = await message.channel.fetchMessage(args[0]);

                    if (!messageToQuote.author.bot) {
                        embedHelper.sendQuote(message.channel, message.author.username,
                            messageToQuote.createdAt, messageToQuote.author.username, messageToQuote.content);
                    }
                }
            }
        } catch (error) {
            await errorsLogging.save(error);
            embedHelper.error(message.channel);
        }
    },
    "processText": async (guildSettings, text, message, client) => {
        try {
            embedHelper.setup(message.channel, guildSettings, client.user.username, client.user.avatarURL);
            let errors = argumentsValidation.checkQuoteTextArgs(text);

            if (errors.length > 0) {
                embedHelper.sendValidationError(commandsDescriptions.quoteTextUsage(), errors);
            } else {
                embedHelper.sendQuoteText(message.channel, message.author.username, text);
            }
        } catch (error) {
            await errorsLogging.save(error);
            embedHelper.error(message.channel);
        }
    },
    "processEmbed": async (guildSettings, args, message, client) => {
        try {
            embedHelper.setup(message.channel, guildSettings, client.user.username, client.user.avatarURL);

            let content = args.split('').reduce((accumulator, currentValue) => {
                if (currentValue === '"') {
                    accumulator.quote ^= 1;
                } else if (!accumulator.quote && currentValue === ' ') {
                    accumulator.val.push('');
                } else {
                    accumulator.val[accumulator.val.length - 1] += currentValue.replace(/\\(.)/, "$1");
                }
                return accumulator;
            }, {
                val: ['']
            }).val;

            //console.log('content:', content);

            let errors = argumentsValidation.checkEmbedArgs(content);

            if (errors.length > 0) {
                embedHelper.sendValidationError(commandsDescriptions.embedUsage(), errors);
            } else {
                embedHelper.sendEmbed(message.channel, message.author.username, content[0], content[1]);
            }
        } catch (error) {
            await errorsLogging.save(error);
            embedHelper.error(message.channel);
        }
    },
}