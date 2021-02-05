module.exports = function (req, data) {

    // Lodash Module
    const _ = require('lodash');

    const tinyCfg = _.defaultsDeep({}, data, {
        mainTimezone: 'Universal'
    });

    // Main Timezone
    this.main = tinyCfg.mainTimezone;

    // Prepare Module
    this.module = require('moment-timezone');

    // Time Now
    this.now = this.module('Universal');

    // Set Timezone
    this.cfg = {};
    if (typeof req.session.primary_timezone !== "string" || !req.session.primary_timezone) {
        req.session.primary_timezone = 'auto';
    }

    if (typeof req.session.primary_timezone !== "string" || !req.session.primary_timezone) {
        req.session.primary_timezone = 'auto';
    }

    if (req.session.primary_timezone === "auto") {
        this.cfg.auto = true;
        this.cfg.actived = req.session.timezone;
    } else {
        this.cfg.auto = false;
        this.cfg.actived = req.session.primary_timezone;
    }

    if (this.cfg.actived) {
        this.cfg.info = this.cfg.actived.replace(/\_/g, ' ');
    } else {
        this.cfg.info = '???';
    }

    // Get List
    this.cfg.list = require('./selectList/timezone')(req.session.primary_timezone);

    // Prepare Clock
    if (typeof req.session.clock24 !== "string" || !req.session.clock24 || (req.session.clock24 !== "on" && req.session.clock24 !== "off")) {
        req.session.clock24 = 'off';
    }

    this.clockCfg = {
        typeOption: setConfig.clock24(req.session.clock24),
        type24hours: req.session.clock24
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