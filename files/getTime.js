module.exports = function (utcTime, timezone = 'Universal', timeFormat = 'dddd, MMMM Do YYYY, ') {

    /* 
        utcTime: The original time stored in a UTC Value
        timezone: The timezone of the UTC Value
    */

    // Prepare Result
    const result = { vanilla: utcTime };

    // Convert Clock Data
    result.moment = this.module.tz(result.vanilla, timezone);
    result.utc = result.moment.clone();
    result.utcUnix = result.utc.unix();

    // Set Primary Timezone
    result.secondary_moment = result.moment.clone().tz(this.cfgSecondary.actived);
    result.moment.tz(this.cfg.actived);

    // Format
    const timeFormatResult = `${timeFormat}${this.clockCfg.format2}`;
    result.time = result.moment.format(timeFormatResult);
    result.secondary_time = result.secondary_moment.format(timeFormatResult);

    // Complete
    return;

};