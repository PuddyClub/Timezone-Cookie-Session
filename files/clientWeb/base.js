module.exports = function (data = { useSecondaryTimezone: false, jQuerydivClock: false }) {

    // Validate Vars
    if (typeof data.jQuerydivClock !== "boolean") { data.jQuerydivClock = false; }
    if (typeof data.divPrimaryClock !== "string") { data.divPrimaryClock = '#primary_clock'; }
    if (typeof data.divSecondary !== "string") { data.divSecondary = '#secondary_clock'; }

    // Timezone
    const tinyclock = {
        extra_loops: [],
        urls: {
            setCookie: `{{setCookieURL}}`
        },
        timezone: `{{primaryTimezone}}`,
        secondary_timezone: `{{secondaryTimezone}}`,
        formatDate: `dddd, MMMM Do YYYY`,
        formatTime: `{{clockFormat}}`,
        formatTime2: `{{clockFormat2}}`,
        mainTimezone: `{{mainTimezone}}`,
        utcValue: `{{utcValue}}`,
        newTimezone: moment
            .tz
            .guess()
    };

    // Compare Clock
    if (`{{primaryTimezoneisAuto}}` === "true") {
        if (tinyclock.timezone !== tinyclock.newTimezone && csrfToken) {
            fetch(tinyclock.urls.setCookie, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type: 'timezone', value: tinyclock.newTimezone, csrfToken: csrfToken })
            });
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
        if (useSecondaryTimezone && tinyclock.timezone !== tinyclock.secondary_timezone) {
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