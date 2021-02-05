module.exports = function (data) {
    return require('./base').toString()
    .replace(/\{\{primaryTimezone\}\}/g, this.cfg.actived)
    .replace(/\{\{primaryTimezoneisAuto\}\}/g, this.cfg.auto.toString())
    .replace(/\{\{type24hoursOn\}\}/g, (this.clockCfg.type24hours === "on").toString());
};