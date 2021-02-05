module.exports = function (req) {

    if (typeof req.session[this.sessionVars.secondary_timezone] !== "string" || !req.session[this.sessionVars.secondary_timezone]) {
        req.session[this.sessionVars.secondary_timezone] = 'auto';
    }

    if (req.session[this.sessionVars.secondary_timezone] === "auto") {
        this.cfgSecondary.auto = true;
        this.cfgSecondary.actived = this.main;
    } else {
        this.cfgSecondary.auto = false;
        this.cfgSecondary.actived = req.session[this.sessionVars.secondary_timezone];
    }

    if (this.cfgSecondary.actived) {
        this.cfgSecondary.info = this.cfgSecondary.actived.replace(/\_/g, ' ');
    } else {
        this.cfgSecondary.info = '???';
    }

    // Get List
    this.cfgSecondary.list = require('./selectList/timezone')(req.session[this.sessionVars.secondary_timezone]);

    // Complete
    return;

};