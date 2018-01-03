let unit = module.exports = {
    "scanUsage": () => {
        return 'Command usage :\n' +
            '```!scan```\n';
    },
    "helpUsage": () => {
        return 'Command usage :\n' +
            '```!help```\n';
    },
    "watchUsage": () => {
        return 'Command usage :\n' +
            '```!watch name \'comment\'```\n' +
            'Where :\n' +
            '\t**__name__** is the player ingame name.\n' +
            '\t**__comment__** is a comment related to this player (optional).\n\n' +
            'Example :\n```!watch Innocent.Bystander \'Cardamine smuggler\'\n' +
            '!watch Hayagfgdf.Kimiko \"Mean person\"\n' +
            '!watch Ishikawa.Hideaki```\n';
    },
    "showUsage": () => {
        return 'Command usage :\n' +
            '```!show term```\n' +
            'Where **__term__** is either :\n' +
            '\tplayers (shorthand p), to display watched players list\n' +
            '\tfactions (shorthand f), to display watched factions list\n\n' +
            'Example :\n```!show players\n' +
            '!show p\n' +
            '!show factions\n' +
            '!show f```\n';
    },
    "adminRemoveUsage": () => {
        return 'Command usage :\n' +
            '```!remove term value```\n' +
            'Where :\n' +
            '\t**__term__** is either :\n' +
            '\t\tplayer (shorthand p), to specify a player deletion\n' +
            '\t\tfaction (shorthand f), to specify a faction deletion\n\n' +
            '\t**__value__** is a player name or faction identifier.\n\n' +
            'Example :\n```!remove player Mean.Pirate\n' +
            '!remove p Something\n' +
            '!remove faction blooddragons\n' +
            '!remove f libertyrogues```\n';
    },
}