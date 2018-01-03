let unit = module.exports = {
    "filter": (onlinePlayers, watchList, playersFilter) => {
        let transformed = [];
        watchList.forEach(element => {
            let players = onlinePlayers.filter(player => playersFilter(element, player));

            if (element.alwaysDisplay || players.length > 0) {
                transformed.push({ name: element.name, players: players, count: players.length });
            }
        });
        return transformed;
    }
}