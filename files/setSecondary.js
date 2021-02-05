module.exports = function (data) {

    // Lodash Module
    const _ = require('lodash');

    const tinyCfg = _.defaultsDeep({}, data, {
        mainTimezone: 'Universal'
    });

};