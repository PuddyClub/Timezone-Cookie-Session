module.exports = function (req, data) {

    // Lodash Module
    const _ = require('lodash');

    const tinyCfg = _.defaultsDeep({}, data, {
        mainTimezone: 'Universal'
    });

    // Prepare Module
    this.module = require('moment-timezone');

    // Time Now
    this.now = this.module('Universal');

    // Manual Timezone
    this.cfg = {};
    if (typeof req.session.manual_timezone !== "string" || !req.session.manual_timezone) {
        req.session.manual_timezone = 'auto';
    }

    if (typeof req.session.manual_timezone !== "string" || !req.session.manual_timezone) {
        req.session.manual_timezone = 'auto';
    }

    if (req.session.manual_timezone === "auto") {
        this.cfg.auto = true;
        this.cfg.actived = req.session.timezone;
    } else {
        this.cfg.auto = false;
        this.cfg.actived = req.session.manual_timezone;
    }

    if (this.cfg.actived) {
        this.cfg.info = this.cfg.actived.replace(/\_/g, ' ');
    } else {
        this.cfg.info = 'Not detected'
    }

    // Main Timezone
    this.cfg.main = tinyCfg.mainTimezone;

    // Complete
    return this;

};