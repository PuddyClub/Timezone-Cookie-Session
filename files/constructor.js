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

    // Complete
    return this;

};