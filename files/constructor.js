module.exports = function (req, data) {

    // Lodash Module
    const _ = require('lodash');

    const tinyCfg = _.defaultsDeep({}, data, {

        // Module Language
        locale: 'en',

        // Main Values
        mainTimezone: 'Universal',

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

    // Main Timezone
    this.main = tinyCfg.mainTimezone;

    // Session vars
    this.sessionVars = tinyCfg.sessionVars;

    // Prepare Module
    this.module = require('moment-timezone');

    // Set Language
    this.module.locale(tinyCfg.locale);

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
    this.cfg.list = require('./selectList/timezone')(req.session[this.sessionVars.primary_timezone]);

    // Prepare Clock
    if (typeof req.session[this.sessionVars.clock24] !== "string" || !req.session[this.sessionVars.clock24] || (req.session[this.sessionVars.clock24] !== "on" && req.session[this.sessionVars.clock24] !== "off")) {
        req.session[this.sessionVars.clock24] = 'off';
    }

    this.clockCfg = {
        typeOption: require('./selectList/clockType')(req.session[this.sessionVars.clock24], tinyCfg.clockLang),
        type24hours: req.session[this.sessionVars.clock24]
    };

    if (this.clockCfg.type24hours === "off") {
        this.clockCfg.format = "hh:mm:ss a";
        this.clockCfg.format2 = "hh:mm a";
    } else {
        this.clockCfg.format = "HH:mm:ss";
        this.clockCfg.format2 = "HH:mm";
    }

    // Complete
    return this;

};