class timezone_module {

    // Constructor
    constructor() { return require('./constructor').apply(this, arguments); }

    // Get URLs
    getUrls() { return this.urls; }

    // Set Secondary Timezone
    setSecondary() { return require('./setSecondary').apply(this, arguments); }

    // List Generator
    getNames() { if (!this.names) { this.names = this.module.tz.names(); } return this.names; }

    // Get Main Timezone
    getMainTimezone() { return this.main; }

    // Get Primary Timezone
    getPrimary() { return this.cfg; }
    getPrimaryValue() { return this.cfg.actived; }

    // Get Secondary Timezone
    getSecondary() { return this.cfgSecondary; }
    getSecondaryValue() { return this.cfgSecondary.actived; }

    // Get Clock Config
    getClockCfg() { return this.clockCfg; }

    // UTC
    convertUTC() { return require('./convertUTC').apply(this, arguments); }
    createUTC() { return require('./createUTC').apply(this, arguments); }
    getUTCValue() { return this.utcValue; }

    // Set Cookie
    setCookie() { return require('./setCookie').apply(this, arguments); }

    // Get Client Web
    getClientWeb() { return require('./clientWeb').apply(this, arguments); }

    // Get Moment Module
    getMoment() { return this.module; }

};

module.exports = timezone_module;