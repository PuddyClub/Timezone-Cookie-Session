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
const timezoneCfg = { urls: { setCookie: '/setCookie' } };
const tzEx = require('../express');
const timezoneExpress = new tzEx(app, timezoneCfg, function (req, res) {
    return new Promise(function (resolve) {
        return bodyParseN(req, res, () => {

            // Return csrfToken
            resolve({
                now: '',
                server: ''
            });

            // Complete
            return;

        });
    });
});

app.use(timezoneExpress.insert());

// Get
app.get('*', (req, res) => {
    console.log(req.timezone);
    return res.render('test', { timezoneTemplate: req.timezone.getClientWeb() });
});

app.listen(5000, function () {
    console.log('http://localhost:5000');
});

