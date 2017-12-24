let unit = module.exports = {
    "filter": (onlinePlayers, watchList, countFilter) => {
        let transformed = [];
        watchList.forEach(element => {
            let players = onlinePlayers.filter(player => countFilter(element, player));

            if (element.alwaysDisplay || players.length > 0) {
                transformed.push({ name: element.name, players: players, count: players.length });
            }
        });
        return transformed;
    }
}