class expressTimezone {

    // Constructor
    constructor(app, data = {}, getCsrfToken = function (req, res) {
        return {
            now: '',
            server: ''
        };
    }) {

        // Insert App
        this.app = app;

        // Lodash Module
        const _ = require('lodash');
        this.data = _.defaultsDeep({}, data, {

            // URLs
            urls: {
                setCookie: '/setCookie'
            },

        });

        // Complete
        return this;

    }

    // Insert Express
    insert() {
        const tinyThis = this;
        return (req, res, next) => {

            // Timezone Module
            const genTimezone = require('./index');

            // Insert Module
            req.timezone = new genTimezone(req, this.data);
            next();

            // Complete
            return;

        };
    }

    // Start Module
    start() {

        // Set Cookie
        this.app.post(this.data.urls.setCookie, async function (req, res) {

            // Send Request
            let csrfToken = await getCsrfToken(req, res);
            req.timezone.setCookie(req, res, csrfToken);

            // Complete
            return;

        });

        // Complete
        return;

    }

};

module.exports = expressTimezone;