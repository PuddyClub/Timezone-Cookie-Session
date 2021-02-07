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

    // Prepare Tiny Clock This
    const tinyClockThis = {

    };

    // Convert UTC
    tinyClock.convertUTC = function () {
        return tinyClock.convertUTC_GENERATOR.apply(tinyClockThis, arguments);
    }

    // Create UTC
    tinyClock.createUTC = function () {
        return CREATEUTC.createUTC_GENERATOR.apply(tinyClockThis, arguments);
    };

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
    if (tinyClock.primaryIsAuto === "true") {
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
    if (tinyClock.type24hoursOn === "true") { tinyClock.is24hours = true; } else { tinyClock.is24hours = false; }

    // Clock Loop
    tinyClock.clockFormat = tinyClock.formatDate + ', ' + tinyClock.formatTime;
    tinyClock.loop = function () {

        // Prepare UTC
        tinyClock.clock = {
            utc: moment.tz(tinyClock.utcValue)
        };

        // Primary Timezone
        tinyClock.clock.timezone = tinyClock.clock.utc.clone().tz(tinyClock.timezone);
        if (data.jQuerydivClock) { $(data.divPrimaryClock).text(tinyClock.clock.timezone.format(tinyClock.clockFormat)); }

        // Secondary Timezone
        if (data.useSecondaryTimezone && tinyClock.timezone !== tinyClock.secondary_timezone) {
            tinyClock.clock.secondary_timezone = tinyClock.clock.utc.clone().tz(tinyClock.secondary_timezone);
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
    return tinyClock;

};