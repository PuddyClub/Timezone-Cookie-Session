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
        const readFile = require('@tinypudding/puddy-lib/http/fileCache');

        // Base
        this.app.get('/tinyClock/base.js', function (req, res, next) {
            return readFile(
                res, next, {
                file: 'tinyClock.start = ' + require('./api/clientWeb')(false).base + ';',
                date: { year: 2021, month: 2, day: 7, hour: 0, minute: 18 },
                timezone: 'America/Sao_Paulo',
                fileMaxAge: tinyThis.data.fileMaxAge
            }
            );
        });

        // Create UTC
        this.app.get('/tinyClock/createUTC.js', function (req, res, next) {
            return readFile(
                res, next, {
                file: 'tinyClock.createUTC_GENERATOR = ' + require('./api/clientWeb')(false).createUTC + ';',
                date: { year: 2021, month: 2, day: 7, hour: 0, minute: 5 },
                timezone: 'America/Sao_Paulo',
                fileMaxAge: tinyThis.data.fileMaxAge
            }
            );
        });

        // Convert UTC
        this.app.get('/tinyClock/convertUTC.js', function (req, res, next) {
            return readFile(
                res, next, {
                file: 'tinyClock.convertUTC_GENERATOR = ' + require('./api/clientWeb')(false).convertUTC + ';',
                date: { year: 2021, month: 2, day: 7, hour: 0, minute: 10 },
                timezone: 'America/Sao_Paulo',
                fileMaxAge: tinyThis.data.fileMaxAge
            }
            );
        });

            // Exec Time
            this.app.get('/tinyClock/execTime.js', function (req, res, next) {
                return readFile(
                    res, next, {
                    file: 'tinyClock.execTime_GENERATOR = ' + require('./api/clientWeb')(false).execTime + ';',
                    date: { year: 2021, month: 2, day: 8, hour: 10, minute: 26 },
                    timezone: 'America/Sao_Paulo',
                    fileMaxAge: tinyThis.data.fileMaxAge
                }
                );
            });

        // Complete
        return;

    }

};

module.exports = expressTimezone;