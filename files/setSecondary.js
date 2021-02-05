module.exports = function (req) {

    /* 
    
        req object works with req.session.
        req string works with the module values only.
    
    */

    // Normal
    if (typeof req !== "string") {

        // Set Session Values
        this.cfgSecondary.isSession = true;
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

    }

    // String
    else {
        this.cfgSecondary.isSession = false;
        this.cfgSecondary.auto = false;
        this.cfgSecondary.actived = req;
    }

    if (this.cfgSecondary.actived) {
        this.cfgSecondary.info = this.cfgSecondary.actived.replace(/\_/g, ' ');
    } else {
        this.cfgSecondary.info = '???';
    }

    // Get List
    if (typeof req !== "string") {
        this.cfgSecondary.list = require('./selectList/timezone')(req.session[this.sessionVars.secondary_timezone]);
    }

    // Complete
    return;

};