// Prepare Modules
const express = require('express');
const nunjucks = require('nunjucks');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

// Timezone Module
const createTimezoneSession = require('../index');

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

// Get
app.get('*', (req, res) => {



});

// Get
app.post('*', (req, res) => {



});

const timezone = new createTimezoneSession();

