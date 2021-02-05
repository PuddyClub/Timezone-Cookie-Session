module.exports = function (utcTime, timezone = 'Universal', allowSecondary = true, timeFormat = 'dddd, MMMM Do YYYY, ') {

    /* 
        utcTime: The original time stored in a UTC Value
        timezone: The timezone of the UTC Value
    */

    // Prepare Result
    const result = { vanilla: utcTime };

    // Exist Secondary
    const existSecondary = (allowSecondary && this.cfgSecondary);

    // Convert Clock Data
    result.time = this.module.tz(result.vanilla, timezone);
    result.utc = result.time.clone();
    result.utcUnix = result.utc.unix();

    // Set Primary Timezone
    if (existSecondary) { result.secondary_time = result.time.clone().tz(this.cfgSecondary.actived); }
    result.time.tz(this.cfg.actived);

    // Format
    const timeFormatResult = `${timeFormat}${this.clockCfg.format2}`;
    result.time = result.time.format(timeFormatResult);
    if (existSecondary) { result.secondary_time = result.secondary_time.format(timeFormatResult); }

    // Complete
    return result;

};