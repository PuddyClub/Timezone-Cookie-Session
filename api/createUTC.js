module.exports = function (body) {

    // Lodash Module
    const _ = require('lodash');
    const tinyCfg = _.defaultsDeep({}, body, {

        // Format Value
        formatValue: null,

        // Date Value
        date: '',

        // Time Value
        time: '',

        // Timezone Value
        timezone: this.utcValue,

        // Final Value Result
        type: 'toDate'

    });

    // Prepare Result
    let dateResult = null;

    // Create New Date
    try {

        // Set New Date
        const newDate = this.module.tz(new Date(tinyCfg.date + " " + tinyCfg.time), tinyCfg.timezone);

        // Set Values
        dateResult = this.module().tz(tinyCfg.timezone);
        dateResult.set('year', newDate.year());
        dateResult.set('month', newDate.month());
        dateResult.set('date', newDate.date());
        dateResult.set('hour', newDate.hour());
        dateResult.set('minute', newDate.minute());
        dateResult.set('second', newDate.second());

    }

    // Fail
    catch (err) {
        dateResult = this.module();
    }

    // Complete

    // Convert to UTC
    dateResult.tz(this.utcValue);

    // Normal
    if (tinyCfg.type !== "format") {
        return dateResult[tinyCfg.type]();
    }
    // Format
    else {
        if (!tinyCfg.formatValue) { return dateResult[tinyCfg.type](); } else { dateResult[tinyCfg.type](tinyCfg.formatValue); }
    }

};