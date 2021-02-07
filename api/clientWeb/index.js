// Base Data
let baseData = {};

module.exports = function () {

    // Prepare Cache
    const lodash = `const _ = require('lodash');`;
    if (typeof baseData.convertUTC !== "string") { baseData.convertUTC = require('../convertUTC').toString().replace(lodash, ''); }
    if (typeof baseData.createUTC !== "string") { baseData.createUTC = require('../createUTC').toString().replace(lodash, ''); }
    if (typeof baseData.base !== "string") { baseData.base = require('./base').toString(); }

    // Files
    this.files = baseData;

    // Return Data
    return `
        var tinyClock = {
            urls: {
                setCookie: \`${this.urls.setCookie}\`
            },
            locale: \`${this.locale}\`,
            timezone: \`${this.cfg.actived}\`,
            secondary_timezone: \`${this.cfgSecondary.actived}\`,
            formatTime: \`${this.clockCfg.format}\`,
            formatTime2: \`${this.clockCfg.format2}\`,
            type24hoursOn: ${(this.clockCfg.type24hours === "on").toString()},
            primaryIsAuto: ${this.cfg.auto.toString()},
            secondaryIsAuto: ${this.secondaryCfg.auto.toString()},
            mainTimezone: {
                primary: \`${this.main.primary}\`,
                secondary: \`${this.main.secondary}\`
            },
            utcValue: \`${this.utcValue}\`
        };
    `;

};