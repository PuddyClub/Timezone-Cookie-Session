module.exports = function (data) {

    // Lodash Module
    const _ = require('lodash');
    const tinyCfg = _.defaultsDeep({}, data, {

        // The original time stored in a UTC Value
        utcTime: null,

        // The timezone of the UTC Value
        timezone: this.utcValue,

        // Allow Secondary Timezone Values
        allowSecondary: true,

        // Time Format
        timeFormat: `dddd, MMMM Do YYYY, ${this.clockCfg.format2}`,

        // Get Unix
        getUnix: true,

        // Get Format
        getFormat: true

    });

    // Prepare Result
    const result = { vanilla: tinyCfg.utcTime };

    // Exist Secondary
    const existSecondary = (tinyCfg.allowSecondary && this.cfgSecondary);

    // Convert Clock Data
    result.time = this.module.tz(result.vanilla, tinyCfg.timezone);
    result.utc = result.time.clone();

    // Get Unix
    if (tinyCfg.getUnix) { result.utcUnix = result.utc.unix(); }

    // Set Timezone
    if (existSecondary) { result.secondary_time = result.time.clone().tz(this.cfgSecondary.actived); }
    result.time.tz(this.cfg.actived);

    // Format
    if (tinyCfg.getFormat) {
        const timeFormatResult = tinyCfg.timeFormat;
        result.time = result.time.format(timeFormatResult);
        if (existSecondary) { result.secondary_time = result.secondary_time.format(timeFormatResult); }
    }

    // Get Date Data
    

    // Complete
    return result;

};