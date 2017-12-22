let unit = module.exports = {
    "stringify": (cookies) => {
        return cookies.map((cookie) => {
            return cookie.substring(0, cookie.indexOf(';'));
        }).join(';');
    }
}