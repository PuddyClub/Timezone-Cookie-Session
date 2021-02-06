module.exports = function (data = {}) {
    return require('./base').toString()
    .replace('{{setCookieURL}}', this.urls.setCookie)
    .replace('{{utcValue}}', this.utcValue)
    .replace('{{primaryTimezone}}', this.cfg.actived)
    .replace('{{secondaryTimezone}}', this.cfgSecondary.actived)
    .replace('{{clockFormat}}', this.clockCfg.format)
    .replace('{{clockFormat2}}', this.clockCfg.format2)
    .replace('{{mainTimezone}}', this.main)
    .replace('{{primaryTimezoneisAuto}}', this.cfg.auto.toString())
    .replace('{{type24hoursOn}}', (this.clockCfg.type24hours === "on").toString());
};