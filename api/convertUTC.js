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

        // Get Format
        getFormat: true

    });

    // Prepare Result
    const result = { vanilla: tinyCfg.utcTime };

    // Exist Secondary
    const existSecondary = (tinyCfg.allowSecondary && this.cfgSecondary);

    // Convert Clock Data
    result.moment = this.moment.tz(result.vanilla, tinyCfg.timezone);
    result.original = result.moment.clone();

    // Set Timezone
    if (existSecondary) { result.secondary_time = result.moment.clone().tz(this.cfgSecondary.actived); }
    result.moment.tz(this.cfg.actived);

    // Moment Secondary
    if (existSecondary) { result.secondary_moment = result.secondary_time; }

    // Format
    if (tinyCfg.getFormat) {
        const timeFormatResult = tinyCfg.timeFormat;
        result.time = result.moment.format(timeFormatResult);
        if (existSecondary) { result.secondary_time = result.secondary_time.format(timeFormatResult); }
    }

    // Complete
    return result;

};