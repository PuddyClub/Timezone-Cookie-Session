module.exports = function (data = {}) {

    // Timezone
    const tinyclock = {
        extra_loops: [],
        timezone: `{{primaryTimezone}}`,
        newTimezone: moment
            .tz
            .guess()
    };

    // Compare Clock
    if (`{{primaryTimezoneisAuto}}` === "true") {
        if (tinyclock.timezone !== tinyclock.newTimezone && csrfToken) {
            fetch("/setCookie", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type: 'timezone', value: tinyclock.newTimezone, csrfToken: csrfToken })
            });
        }
    }

    // Rest Set
    tinyclock.secondary_timezone = `{{secondaryTimezone}}`;
    tinyclock.formatDate = `dddd, MMMM Do YYYY`;
    tinyclock.formatTime = `{{clockFormat}}`;
    tinyclock.formatTime = `{{clockFormat2}}`;
    tinyclock.mainTimezone = `{{mainTimezone}}`;
    tinyclock.is24hours = null;
    if (`{{type24hoursOn}}` === "true") { tinyclock.is24hours = true; } else { tinyclock.is24hours = false; }

    // Complete
    return tinyclock;

};