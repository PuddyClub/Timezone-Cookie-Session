class timezone_module {

    // Constructor
    constructor() { return require('./files/constructor').apply(this, arguments); }

    // Set Secondary Timezone
    setSecondary() { return require('./files/setSecondary').apply(this, arguments); }

    // List Generator
    getNames() { if (!this.names) { this.names = this.tz.names(); } return this.names; }

};

module.exports = timezone_module;