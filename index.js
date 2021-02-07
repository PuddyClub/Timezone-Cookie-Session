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
        this.getCsrfToken = getCsrfToken;

        // Lodash Module
        const _ = require('lodash');
        this.data = _.defaultsDeep({}, data, {

            // URLs
            urls: {
                setCookie: '/setCookie'
            },

        });

        // Convert Number
        if (typeof this.data.fileMaxAge) {
            this.data.fileMaxAge = this.data.fileMaxAge / 1000;
        }

        // Complete
        return this;

    }

    // Insert Express
    insert() {
        const tinyThis = this;
        return (req, res, next) => {

            // Timezone Module
            const genTimezone = require('./api');

            // Insert Module
            req.timezone = new genTimezone(req, tinyThis.data);
            next();

            // Complete
            return;

        };
    }

    // Start Module
    start() {

        // Get This
        const tinyThis = this;

        // Set Cookie
        this.app.post(this.data.urls.setCookie, async function (req, res) {

            // Send Request
            const csrfToken = await tinyThis.getCsrfToken(req, res);
            req.timezone.setCookie(req, res, csrfToken);

            // Complete
            return;

        });

        // Files

        // Base
        this.app.get('/tinyClock/base.js', function (req, res) {

            // Exist Files
            if (tinyThis.files && typeof tinyThis.files.base === "string") {

                res.setHeader('Content-Type', 'text/javascript');
                res.set('Cache-Control', `public, max-age=${tinyThis.data.fileMaxAge}, s-maxage=${tinyThis.data.fileMaxAge}`);
                res.setHeader('Content-Length', require('byte-length').byteLength(tinyThis.files.base));
                res.send(tinyThis.files.base);

            }

            // Nope
            else { next(); }

            // Complete
            return;

        });

        // Create UTC
        this.app.get('/tinyClock/createUTC.js', function (req, res) {

            // Exist Files
            if (tinyThis.files && typeof tinyThis.files.createUTC === "string") {

                res.setHeader('Content-Type', 'text/javascript');
                res.set('Cache-Control', `public, max-age=${tinyThis.data.fileMaxAge}, s-maxage=${tinyThis.data.fileMaxAge}`);
                res.setHeader('Content-Length', require('byte-length').byteLength(tinyThis.files.createUTC));
                res.send(tinyThis.files.createUTC);

            }

            // Nope
            else { next(); }

            // Complete
            return;

        });

        // Convert UTC
        this.app.get('/tinyClock/convertUTC.js', function (req, res, next) {

            // Exist Files
            if (tinyThis.files && typeof tinyThis.files.convertUTC === "string") {

                res.setHeader('Content-Type', 'text/javascript');
                res.set('Cache-Control', `public, max-age=${tinyThis.data.fileMaxAge}, s-maxage=${tinyThis.data.fileMaxAge}`);
                res.setHeader('Content-Length', require('byte-length').byteLength(tinyThis.files.convertUTC));
                res.send(tinyThis.files.convertUTC);

            }

            // Nope
            else { next(); }

            // Complete
            return;

        });

        // Complete
        return;

    }

};

module.exports = expressTimezone;