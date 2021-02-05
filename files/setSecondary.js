module.exports = function (data) {

    // Lodash Module
    const _ = require('lodash');

    const tinyCfg = _.defaultsDeep({}, data, {
        mainTimezone: 'Universal'
    });

    if (typeof req.session.secondary_timezone !== "string" || !req.session.secondary_timezone) {
        req.session.secondary_timezone = 'auto';
    }

    if (req.session.secondary_timezone === "auto") {
        this.cfgSecondary.auto = true;
        this.cfgSecondary.actived = tinyCfg.mainTimezone;
    } else {
        this.cfgSecondary.auto = false;
        this.cfgSecondary.actived = req.session.secondary_timezone;
    }

    if (this.cfgSecondary.actived) {
        this.cfgSecondary.info = this.cfgSecondary.actived.replace(/\_/g, ' ');
    } else {
        this.cfgSecondary.info = '???';
    }

    // Get List
    this.cfgSecondary.list = require('./selectList/timezone')(req.session.secondary_timezone);

    // Complete
    return;

};