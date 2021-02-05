module.exports = function (utcTime, timezone) {

    /* 
        utcTime: The original time stored in a UTC Value
        timezone: The timezone of the UTC Value
    */

    // Prepare Result
    const result = { date: { vanilla: utcTime } };

    // Convert Clock Data

    result.date.moment = moment.tz(result.date.vanilla, timezone);
    result.date.original = result.date.moment.clone();
    result.date.unix = result.date.original.unix();

    // Set Timezone
    result.date.secondary_moment = result.date.moment.clone().tz(defaultPage.timezones.secondary_actived);
    result.date.moment.tz(defaultPage.timezones.actived);

    // Format
    let timeFormat = `dddd, MMMM Do YYYY, ${defaultPage.timezones.clock.format2}`;
    result.date.time = result.date.moment.format(timeFormat);
    result.date.secondary_time = result.date.secondary_moment.format(timeFormat);

    // Added Date
    result.added_date = {
        vanilla: result.added_date
    };

    result.added_date.moment = moment(result.added_date.vanilla);
    result.added_date.secondary_moment = result.added_date.moment.clone().tz(defaultPage.timezones.secondary_actived);
    result.added_date.moment.tz(defaultPage.timezones.actived);

    // Unix and Format
    result.added_date.unix = result.added_date.moment.unix();
    result.added_date.time = result.added_date.moment.format(timeFormat);
    result.added_date.secondary_time = result.added_date.secondary_moment.format(timeFormat);

    // Complete
    return;

};