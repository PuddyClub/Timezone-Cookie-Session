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
    const tinyclock = {
        extra_loops: [],
        urls: {
            setCookie: `{{setCookieURL}}`
        },
        locale: `{{momentjsLang}}`,
        timezone: `{{primaryTimezone}}`,
        secondary_timezone: `{{secondaryTimezone}}`,
        formatDate: data.formatDate,
        formatTime: `{{clockFormat}}`,
        formatTime2: `{{clockFormat2}}`,
        mainTimezone: {
            primary: `{{mainPrimaryTimezone}}`,
            secondary: `{{mainSecondaryTimezone}}`
        },
        utcValue: `{{utcValue}}`,
        newTimezone: moment
            .tz
            .guess()
    };

    // Prepare Tiny Clock This
    const tinyClockThis = {

    };

    // Convert UTC
    tinyclock.convertUTC = function () {
        return CONVERTUTC.apply(tinyClockThis, arguments);
    }

    // Create UTC
    tinyclock.createUTC = function () {
        return CREATEUTC.createUTC_GENERATOR.apply(tinyClockThis, arguments);
    };

    // Set Moment Locale
    moment.locale(tinyclock.locale);

    // Fetch
    tinyclock.fetch = {

        // Set Cookie
        setCookie: function (type, value, csrfToken) {
            return new Promise(function (resolve, reject) {

                fetch(tinyclock.urls.setCookie, {
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
    if (`{{primaryTimezoneisAuto}}` === "true") {
        if (tinyclock.timezone !== tinyclock.newTimezone) {

            // Start Set Auto Timezone
            const setAutoTimezone = function () {
                return new Promise(function (resolve, reject) {
                    tinyclock.fetch.setCookie('timezone', tinyclock.newTimezone, data.csrfToken).then(() => {
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
    tinyclock.is24hours = null;
    if (`{{type24hoursOn}}` === "true") { tinyclock.is24hours = true; } else { tinyclock.is24hours = false; }

    // Clock Loop
    tinyclock.clockFormat = tinyclock.formatDate + ', ' + tinyclock.formatTime;
    tinyclock.loop = function () {

        // Prepare UTC
        tinyclock.clock = {
            utc: moment.tz(tinyclock.utcValue)
        };

        // Primary Timezone
        tinyclock.clock.timezone = tinyclock.clock.utc.clone().tz(tinyclock.timezone);
        if (data.jQuerydivClock) { $(data.divPrimaryClock).text(tinyclock.clock.timezone.format(tinyclock.clockFormat)); }

        // Secondary Timezone
        if (data.useSecondaryTimezone && tinyclock.timezone !== tinyclock.secondary_timezone) {
            tinyclock.clock.secondary_timezone = tinyclock.clock.utc.clone().tz(tinyclock.secondary_timezone);
            if (data.jQuerydivClock) { $(data.divSecondary).text(tinyclock.clock.secondary_timezone.format(tinyclock.clockFormat)); }
        }

        // Extra Loops
        for (const item in tinyclock.extra_loops) {
            if (typeof tinyclock.extra_loops[item] === "function") {
                tinyclock.extra_loops[item]();
            }
        }

        // Complete
        return;

    };

    // Complete
    return tinyclock;

};