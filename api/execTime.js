module.exports = function (data, callback, errCallback) {

    // Lodash Module
    const _ = require('lodash');
    const tinyThis = this;
    const tinyCfg = _.defaultsDeep({}, data, {

        // The original time stored in a UTC Value
        utcTime: null,

        // The timezone of the UTC Value
        timezone: this.utcValue,

        // Allow Secondary Timezone Values
        allowSecondary: false,

        // Get Format
        getFormat: false,

        // Get Original
        getOriginal: false

    });

    // TIme Function
    const timeFunction = function (resolve, reject) {

        // Prepare Result
        const result = tinyThis.convertUTC(tinyCfg);
        result.diff = result.moment.diff(tinyThis.moment.tz(tinyThis.cfg.actived), 'seconds');

        // Failed
        if (result.diff > 0) {
            const err = new Error('You need to wait more!');
            err.timezone = result;
            reject(err);
        }

        // Execute
        else { resolve(result); }

        // Complete
        return;

    };

    // Exist Callback
    if (typeof callback === "function") {
        return timeFunction(callback, errCallback);
    }

    // Nope
    else { return new Promise(function (resolve, reject) { timeFunction(resolve, reject); }); }

};