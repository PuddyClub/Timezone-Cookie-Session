// Base Data
let baseData = {
    'convertUTC.js': null,
    'createUTC.js': null,
    'tinyClock.js': null
};

module.exports = function () {

    // Remove Module
    const lodash = `const _ = require('lodash');`;

    // Prepare Files
    this.files = {};

    // Tiny Clock
    if (typeof baseData['tinyClock.js'] !== "string") { baseData['tinyClock.js'] = require('./tinyClock').toString(); }
    this.files['tinyClock.js'] = baseData['tinyClock.js']
    .replace('{{momentjsLang}}', this.locale)
    .replace('{{setCookieURL}}', this.urls.setCookie)
    .replace('{{utcValue}}', this.utcValue)
    .replace('{{primaryTimezone}}', this.cfg.actived)
    .replace('{{secondaryTimezone}}', this.cfgSecondary.actived)
    .replace('{{clockFormat}}', this.clockCfg.format)
    .replace('{{clockFormat2}}', this.clockCfg.format2)
    .replace('{{mainPrimaryTimezone}}', this.main.primary)
    .replace('{{mainSecondaryTimezone}}', this.main.secondary)
    .replace('{{primaryTimezoneisAuto}}', this.cfg.auto.toString())
    .replace('{{type24hoursOn}}', (this.clockCfg.type24hours === "on").toString());

    // Create UTC
    if (typeof baseData['createUTC.js'] !== "string") { baseData['createUTC.js'] = require('../createUTC').toString().replace(lodash, ''); }
    this.files['createUTC.js'] = baseData['createUTC.js'];

    // Convert UTC
    if (typeof baseData['convertUTC.js'] !== "string") { baseData['convertUTC.js'] = require('../convertUTC').toString().replace(lodash, ''); }
    this.files['convertUTC.js'] = baseData['convertUTC.js'];

    // Complete
    return this.files['tinyClock.js'];

};