let unit = module.exports = {
    "stringify": (cookies) => {
        return cookies.map(function (cookie) {
            return cookie.substring(0, cookie.indexOf(';'));
        }).join(';');
    }
}