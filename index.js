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
        if (typeof this.data.fileMaxAge === "string") { this.data.fileMaxAge = Number(this.data.fileMaxAge); }
        if (typeof this.data.fileMaxAge === "number") { this.data.fileMaxAge = this.data.fileMaxAge / 1000; }

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
        const readFile = function (file, date, timezone, res, next) {

            // Is String
            if (typeof file === "string") {

                // File Type
                res.setHeader('Content-Type', 'application/javascript');
                res.setHeader('Content-MD5', Buffer.from(require('md5')(file)).toString('base64'));
                res.setHeader('Accept-Ranges', 'bytes');
                res.setHeader('Access-Control-Allow-Origin', 'same-origin');
                res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
                res.setHeader('X-Content-Type-Options', 'nosniff');
                res.setHeader('X-Frame-Options', 'SAMEORIGIN');
                res.setHeader('Timing-Allow-Origin', 'same-origin');
                res.setHeader('Last-Modified', require('moment-timezone').tz(date, timezone).toString());
                res.removeHeader('Connection');
                res.removeHeader('X-Powered-By');

                // Cache Control
                if (typeof tinyThis.data.fileMaxAge === "number") {
                    res.set('Cache-Control', `public, max-age=${tinyThis.data.fileMaxAge}, s-maxage=${tinyThis.data.fileMaxAge}`);
                    res.set('Strict-Transport-Security', `max-age=${tinyThis.data.fileMaxAge / 2}`);
                }

                // File Size
                res.setHeader('Content-Length', require('byte-length').byteLength(file));

                // Send FIle
                res.send(file);

            }

            // Nope
            else { next(); }

            // Complete
            return;

        };

        // Base
        this.app.get('/tinyClock/base.js', function (req, res, next) {
            return readFile(
                'tinyClock.start = ' + require('./api/clientWeb')(false).base + ';',
                { year: 2021, month: 2, day: 7, hour: 0, minute: 18 }, 'America/Sao_Paulo', res, next
            );
        });

        // Create UTC
        this.app.get('/tinyClock/createUTC.js', function (req, res, next) {
            return readFile(
                'tinyClock.createUTC_GENERATOR = ' + require('./api/clientWeb')(false).createUTC + ';',
                { year: 2021, month: 2, day: 7, hour: 0, minute: 5 }, 'America/Sao_Paulo', res, next
            );
        });

        // Convert UTC
        this.app.get('/tinyClock/convertUTC.js', function (req, res, next) {
            return readFile(
                'tinyClock.convertUTC_GENERATOR = ' + require('./api/clientWeb')(false).convertUTC + ';',
                { year: 2021, month: 2, day: 7, hour: 0, minute: 10 }, 'America/Sao_Paulo', res, next
            );
        });

        // Complete
        return;

    }

};

module.exports = expressTimezone;