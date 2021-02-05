module.exports = function (body) {

    // Lodash Module
    const _ = require('lodash');
    const tinyCfg = _.defaultsDeep({}, body, {

        // Date Value
        date: '',

        // Time Value
        time: '',

        // Timezone Value
        timezone: this.utcValue,

        // Final Value Result (toDate or toString or valueOf or format)
        type: 'toString'

    });

    // Prepare Result
    let dateResult = null;

    // Create New Date
    try {

        // Set New Date
        const newDate = this.module(new Date(tinyCfg.date + " " + tinyCfg.time));

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

    // Format
    if (tinyCfg.type === "format") {

        // Convert to UTC
        dateResult.tz(this.utcValue);

        // Complete
        return dateResult.format();

    }

    // to Date
    else if (tinyCfg.type === "toDate") {

        // Convert to UTC
        dateResult.tz(this.utcValue);

        // Complete
        return dateResult.toDate();

    }

    // Other
    else { return dateResult[tinyCfg.type](); }

};