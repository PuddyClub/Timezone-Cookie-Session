module.exports = function (req, where) {

    // Lodash Module
    const _ = require('lodash');
    const tinyCfg = _.defaultsDeep({}, where, {
        primaryTimezone: true,
        secondaryTimezone: true,
        clockCfg: true
    });

    // Result
    const tinyresult = {};

    // Primary Timezone
    if (tinyCfg.primaryTimezone) {
        this.cfg.list = require('./selectList/timezone').apply(this, [req.session[this.sessionVars.primary_timezone]]);
        tinyresult.primaryTimezone = this.cfg.list;
    }

    // Secondary Timezone
    if (tinyCfg.secondaryTimezone) {
        this.cfgSecondary.list = require('./selectList/timezone').apply(this, [req.session[this.sessionVars.secondary_timezone]]);
        tinyresult.secondaryTimezone = this.cfgSecondary.list;
    }

    // Clock Config
    if (tinyCfg.clockCfg) {
        this.clockCfg.typeOption = require('./selectList/clockType').apply(this, [req.session[this.sessionVars.clock24], tinyCfg.clockLang]);
        tinyresult.clockCfg = this.clockCfg.typeOption;
    }

    // Keys Amount
    const keysAmount = { values: Object.keys(tinyresult) };
    keysAmount.count = keysAmount.values.length;

    // Start
    if (keysAmount.count < 2) {

        // One
        if (keysAmount.count > 0) { return tinyresult[keysAmount.values[0]]; }

        // Nothing
        else { return null; }

    }

    // All
    else { return tinyresult; }

};