// Base Data
let baseData = {};

module.exports = function (isThis = true) {

    // Prepare Cache
    const lodash = `const _ = require('lodash');`;
    if (typeof baseData.convertUTC !== "string") { baseData.convertUTC = require('../convertUTC').toString().replace(lodash, ''); }
    if (typeof baseData.createUTC !== "string") { baseData.createUTC = require('../createUTC').toString().replace(lodash, ''); }
    if (typeof baseData.base !== "string") { baseData.base = require('./base').toString(); }

    // Exist This
    if (isThis) {

        // Files
        this.files = baseData;

        // The Timezone
        let timezone = '';
        let secondary_timezone = '';
        if(this.cfg.actived){
            timezone = `tinyClock.timezone = \`${this.cfg.actived}\`;`;
        }

        if(this.cfgSecondary){
            secondary_timezone = `tinyClock.secondary_timezone = \`${this.cfgSecondary.actived}\`;`;
        }

        // Return Data
        return `
        <script id="tinyClock">
        
        var tinyClock = {
            urls: {
                setCookie: \`${this.urls.setCookie}\`
            },
            locale: \`${this.locale}\`,
            formatTime: \`${this.clockCfg.format}\`,
            formatTime2: \`${this.clockCfg.format2}\`,
            type24hoursOn: ${(this.clockCfg.type24hours === "on").toString()},
            primaryIsAuto: ${this.cfg.auto.toString()},
            secondaryIsAuto: ${this.cfgSecondary.auto.toString()},
            mainTimezone: {
                primary: \`${this.main.primary}\`,
                secondary: \`${this.main.secondary}\`
            },
            utcValue: \`${this.utcValue}\`
        };

        ${timezone}
        ${secondary_timezone}

        </script>
    `;

    }

    // Nope
    else { return baseData; }

};