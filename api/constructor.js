module.exports = function (req, data) {

    // Lodash Module
    const _ = require('lodash');
    const tinyCfg = _.defaultsDeep({}, data, {

        // Allow Set Secondary
        setSecondary: false,

        // Auto List
        autoList: false,

        // URLs
        urls: {
            setCookie: '/setCookie'
        },

        // Clock 24 Hours Default Value
        clock24: false,

        // Module Language
        locale: 'en',

        // UTC Value
        utcValue: 'Universal',

        // Main Values
        mainTimezone: {
            primary: 'Universal',
            secondary: 'Universal'
        },

        // Session Vars
        sessionVars: {
            primary_timezone: 'primary_timezone',
            secondary_timezone: 'secondary_timezone',
            timezone: 'timezone',
            clock24: 'clock24'
        },

        // Clock Lang
        clockLang: {
            off: '12 Hours',
            on: '24 Hours'
        }

    });

    // Prepare Module
    this.moment = require('moment-timezone');

    // Fix Main Timezone
    if (typeof tinyCfg.mainTimezone === "string") {
        tinyCfg.mainTimezone = { primary: tinyCfg.mainTimezone, secondary: tinyCfg.mainTimezone };
    }

    // Auto List
    this.autoList = tinyCfg.autoList;

    // URLs
    this.urls = tinyCfg.urls;

    // UTC Value
    this.utcValue = tinyCfg.utcValue;
    this.moment.tz.setDefault(this.utcValue);

    // Main Timezone
    this.main = tinyCfg.mainTimezone;

    // Session vars
    this.sessionVars = tinyCfg.sessionVars;

    // Set Language
    this.moment.locale(tinyCfg.locale);
    this.locale = tinyCfg.locale;

    // Set Timezone
    this.cfg = {};
    if (typeof req.session[this.sessionVars.primary_timezone] !== "string" || !req.session[this.sessionVars.primary_timezone]) {
        req.session[this.sessionVars.primary_timezone] = 'auto';
    }

    if (typeof req.session[this.sessionVars.primary_timezone] !== "string" || !req.session[this.sessionVars.primary_timezone]) {
        req.session[this.sessionVars.primary_timezone] = 'auto';
    }

    if (req.session[this.sessionVars.primary_timezone] === "auto") {
        this.cfg.auto = true;
        this.cfg.actived = req.session[this.sessionVars.timezone];
    } else {
        this.cfg.auto = false;
        this.cfg.actived = req.session[this.sessionVars.primary_timezone];
    }

    if (this.cfg.actived) {
        this.cfg.info = this.cfg.actived.replace(/\_/g, ' ');
    } else {
        this.cfg.info = '???';
    }

    // Get List
    if (this.autoList) { this.cfg.list = require('./selectList/timezone').apply(this, [req.session[this.sessionVars.primary_timezone]]); }

    // Prepare Clock
    if (typeof req.session[this.sessionVars.clock24] !== "string" || !req.session[this.sessionVars.clock24] || (req.session[this.sessionVars.clock24] !== "on" && req.session[this.sessionVars.clock24] !== "off")) {

        if (!tinyCfg.clock24) {
            req.session[this.sessionVars.clock24] = 'off';
        } else {
            req.session[this.sessionVars.clock24] = 'on';
        }

    }

    // Main Values
    this.clockCfg = {
        type24hours: req.session[this.sessionVars.clock24],
        langVars: tinyCfg.clockLang
    };

    // Auto List
    if (this.autoList) { this.clockCfg.typeOption = require('./selectList/clockType').apply(this, [req.session[this.sessionVars.clock24], this.clockCfg.langVars]); }

    // Clock Values
    if (this.clockCfg.type24hours === "off") {
        this.clockCfg.format = "hh:mm:ss a";
        this.clockCfg.format2 = "hh:mm a";
    } else {
        this.clockCfg.format = "HH:mm:ss";
        this.clockCfg.format2 = "HH:mm";
    }

    // Secondary Timezone
    this.cfgSecondary = {};
    if (tinyCfg.setSecondary) { this.setSecondary(req); }

    // Complete
    return this;

};