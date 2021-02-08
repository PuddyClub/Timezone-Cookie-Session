module.exports = function (data = {
    useSecondaryTimezone: false,
    jQuerydivClock: false,
    autoTimezoneCallback: null,
    csrfToken: null
}) {

    // Validate Vars
    if (typeof data.useSecondaryTimezone !== "boolean") { data.useSecondaryTimezone = false; }
    if (typeof data.jQuerydivClock !== "boolean") { data.jQuerydivClock = false; }
    if (typeof data.divPrimaryClock !== "string") { data.divPrimaryClock = '#primary_clock'; }
    if (typeof data.divSecondary !== "string") { data.divSecondary = '#secondary_clock'; }
    if (typeof data.csrfToken !== "string") { data.csrfToken = null; }
    if (typeof data.autoTimezoneCallback !== "function") { data.autoTimezoneCallback = null; }
    if (typeof data.formatDate !== "string") { data.formatDate = `dddd, MMMM Do YYYY`; }

    // Timezone
    tinyClock.extra_loops = [];
    tinyClock.formatDate = data.formatDate;
    tinyClock.newTimezone = moment.tz.guess();

    // Set Moment Locale
    moment.locale(tinyClock.locale);

    // Fetch
    tinyClock.fetch = {

        // Set Cookie
        setCookie: function (type, value, csrfToken) {
            return new Promise(function (resolve, reject) {

                fetch(tinyClock.urls.setCookie, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ type: type, value: value, csrfToken: csrfToken })
                })
                    .then(() => {
                        resolve();
                        return;
                    })
                    .catch(err => {
                        reject(err);
                        return;
                    });

                // Complete
                return;

            });

        }

    };

    // Compare Clock
    if (tinyClock.primaryIsAuto === true) {
        if (tinyClock.timezone !== tinyClock.newTimezone) {

            // Start Set Auto Timezone
            const setAutoTimezone = function () {
                return new Promise(function (resolve, reject) {
                    tinyClock.fetch.setCookie('timezone', tinyClock.newTimezone, data.csrfToken).then(() => {
                        resolve();
                        return;
                    }).catch(err => {
                        reject(err);
                        return;
                    });
                });
            };

            // Exist Function
            if (typeof data.autoTimezoneCallback === "function") {
                data.autoTimezoneCallback(setAutoTimezone);
            }

            // Nope
            else { setAutoTimezone(); }

        }
    }

    // is 24 Hours
    tinyClock.is24hours = null;
    if (tinyClock.type24hoursOn === true) { tinyClock.is24hours = true; } else { tinyClock.is24hours = false; }

    // The Timezone
    tinyClock.loopValues = {

        // Primary
        primary: { value: tinyClock.timezone },

        // Secondary
        secondary: { value: tinyClock.secondary_timezone }

    };

    // The Info
    if (tinyClock.timezone) { tinyClock.loopValues.primary.info = tinyClock.timezone.replace(/\_/g, ' ') };
    if (tinyClock.secondary_timezone) { tinyClock.loopValues.primary.info = tinyClock.secondary_timezone.replace(/\_/g, ' '); }

    // Fix Primary
    if (typeof tinyClock.loopValues.primary.value !== "string") {
        tinyClock.loopValues.primary.value = tinyClock.newTimezone;
        tinyClock.loopValues.primary.info = tinyClock.newTimezone.replace(/\_/g, ' ');
    }

    // Fix Secondary
    if (typeof tinyClock.loopValues.secondary.value !== "string") {
        tinyClock.loopValues.secondary.value = tinyClock.newTimezone;
        tinyClock.loopValues.secondary.info = tinyClock.newTimezone.replace(/\_/g, ' ');
    }

    // Prepare Tiny Clock This
    const tinyClockThis = {
        utcValue: tinyClock.utcValue,
        moment: moment,
        cfg: { actived: tinyClock.loopValues.primary.value },
        cfgSecondary: { actived: tinyClock.loopValues.secondary.value },
        clockCfg: { format2: tinyClock.formatTime2 }
    };

    // Convert UTC
    tinyClock.convertUTC = function () {
        return tinyClock.convertUTC_GENERATOR.apply(tinyClockThis, arguments);
    }

    // Create UTC
    tinyClock.createUTC = function () {
        return tinyClock.createUTC_GENERATOR.apply(tinyClockThis, arguments);
    };

    // Exec Time
    tinyClockThis.convertUTC = tinyClock.convertUTC;
    tinyClock.execTime = function () {
        return tinyClock.execTime_GENERATOR.apply(tinyClockThis, arguments);
    };

    // Clock Loop
    tinyClock.clockFormat = tinyClock.formatDate + ', ' + tinyClock.formatTime;
    tinyClock.loop = function () {

        // Prepare UTC
        tinyClock.clock = {
            utc: moment.tz(tinyClock.utcValue)
        };

        // Primary Timezone
        tinyClock.clock.timezone = tinyClock.clock.utc.clone().tz(tinyClock.loopValues.primary.value);
        if (data.jQuerydivClock) { $(data.divPrimaryClock).text(tinyClock.clock.timezone.format(tinyClock.clockFormat)); }

        // Secondary Timezone
        if (data.useSecondaryTimezone && tinyClock.loopValues.primary.value !== tinyClock.loopValues.secondary.value) {
            tinyClock.clock.secondary_timezone = tinyClock.clock.utc.clone().tz(tinyClock.loopValues.secondary.value);
            if (data.jQuerydivClock) { $(data.divSecondary).text(tinyClock.clock.secondary_timezone.format(tinyClock.clockFormat)); }
        }

        // Extra Loops
        for (const item in tinyClock.extra_loops) {
            if (typeof tinyClock.extra_loops[item] === "function") {
                tinyClock.extra_loops[item]();
            }
        }

        // Complete
        return;

    };

    // Complete
    return;

};