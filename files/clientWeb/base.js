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
    tinyclock.secondary_timezone = `{{global.timezones.secondary_actived}}`;
    tinyclock.formatDate = `dddd, MMMM Do YYYY`;
    tinyclock.formatTime = `{{global.timezones.clock.format}}`;
    tinyclock.is24hours = null;
    tinyclock.mainTimezone = `{{global.timezones.mainTimezone}}`;
    if (`{{type24hoursOn}}` === "true") { tinyclock.is24hours = true; } else { tinyclock.is24hours = false; }

    // Complete
    return tinyclock;

};