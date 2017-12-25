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
    }
}