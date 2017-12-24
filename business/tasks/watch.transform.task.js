let unit = module.exports = {
    "filter": (onlinePlayers, watchList, filter) => {
        let transformed = [];
        watchList.forEach(element => {
            let count = onlinePlayers.filter(player => filter(element, player)).length;

            if (element.alwaysDisplay || count > 0) {
                transformed.push({ name: element.name, count: count });
            }
        });
        return transformed;
    }
}