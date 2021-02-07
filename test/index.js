// Prepare Modules
const express = require('express');
const nunjucks = require('nunjucks');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const path = require('path');

// Prepare Express
const app = express();

// Cookie Session
app.use(cookieSession({
    keys: ['00000000000', '00000000000']
}));

// Body Parser
app.use(bodyParser.json());
const bodyParseN = bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
});

// Nunjucks
nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app
});

app.set('view engine', 'nunjucks');

// Static Files
app.use(express.static(path.join(__dirname, '/public'), {
    maxAge: '2592000000' // uses milliseconds per docs
}));

// Timezone Module
const tzEx = require('../index');
const timezoneExpress = new tzEx(app, { urls: { setCookie: '/setCookie' }, clock24: true, autoList: true, setSecondary: true }, function (req, res) {
    return new Promise(function (resolve) {
        bodyParseN(req, res, () => {

            // Return csrfToken
            resolve({
                now: '',
                server: ''
            });

            // Complete
            return;

        });
        return;
    });
});

app.use(timezoneExpress.insert());

// Homepage
app.all('/', bodyParseN, (req, res) => {

    // Console Result
    console.group(new Date().toString());

    // Req
    console.log(req.session);
    console.log(req.timezone);

    // Post
    if (req.method === "POST") {

        // Result
        const result = {};

        // Value to Test
        const testValue = {
            time: req.body.time,
            date: req.body.date,
            timezone: 'America/Sao_Paulo'
        };

        // Post
        result.body = testValue;

        // From Now
        testValue.type = 'fromNow';
        result.fromNow = req.timezone.createUTC(testValue);

        // Format
        testValue.type = 'format';
        result.format = req.timezone.createUTC(testValue);

        // Date
        testValue.type = 'toDate';
        result.toDate = req.timezone.createUTC(testValue);

        // Calendar
        testValue.type = 'calendar';
        result.calendar = req.timezone.createUTC(testValue);

        // String
        testValue.type = 'toString';
        result.toString = req.timezone.createUTC(testValue);

        // Value Of
        testValue.type = 'valueOf';
        result.valueOf = req.timezone.createUTC(testValue);

        // Convert
        result.final = req.timezone.convertUTC({
            utcTime: result.format,
            timezone: testValue.timezone,
        });

        // Show Results
        console.log(result);

    }

    console.groupEnd();

    return res.render('test', { timezone: req.timezone, timezoneTemplate: req.timezone.getClientWeb() });
});

// Start Timezone Module
timezoneExpress.start();

app.listen(5000, function () {
    console.log('http://localhost:5000');
});

