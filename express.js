module.exports = function (data = {}, getCsrfToken = function () {
    return {
        now: '',
        server: ''
    };
}) {

    // Express Callback
    return async (req, res, next) => {

        // Timezone Module
        const genTimezone = require('./index');

        // Insert Module
        req.timezone = new genTimezone(req, data);

        // Set Cookie URL
        const setCookieURL = req.timezone.getUrls().setCookie;

        // Next Item
        if (req.url !== setCookieURL && !req.url.startsWith(setCookieURL + '?')) {
            next();
        }

        // Nope
        else {

            // Send Request
            let csrfToken = await getCsrfToken(req, res, next);
            req.timezone.setCookie(req, res, csrfToken);

        }

        // Complete
        return;

    };
    
};