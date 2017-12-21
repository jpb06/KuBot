let unit = module.exports = {
    // [ 'mybb[lastvisit]=xxx; expires=Fri, 21-Dec-2018 09:07:04 GMT; path=/forums/; domain=.discoverygc.com; Secure',
    // 'mybb[lastactive]=xxx; expires=Fri, 21-Dec-2018 09:07:04 GMT; path=/forums/; domain=.discoverygc.com; Secure',
    // 'sid=xxx; path=/forums/; domain=.discoverygc.com; HttpOnly; Secure',
    // 'loginattempts=xxx; expires=Fri, 21-Dec-2018 09:07:04 GMT; path=/forums/; domain=.discoverygc.com; Secure',
    // 'sid=xxx; path=/forums/; domain=.discoverygc.com; HttpOnly; Secure',
    // 'mybbuser=xxx; expires=Fri, 21-Dec-2018 09:07:04 GMT; path=/forums/; domain=.discoverygc.com; HttpOnly; Secure' ]

    "parse": (cookies) => {
        let result = [];

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            cookie = cookie.substring(0, cookie.indexOf(';'));
            // let type = cookie.substring(0, cookie.indexOf('='));
            // let value = cookie.substring(cookie.indexOf('=') + 1);

            // result[type] = value;

            result.push(cookie);
        }

        return result;
    }
}