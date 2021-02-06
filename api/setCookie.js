module.exports = async function (req, res, csrfToken = {
    server: '',
    now: ''
}) {

    // Yes
    if (req.method === "POST" && req.body && typeof req.body.value === "string") {

        // Check Code
        if (csrfToken.now !== csrfToken.server) {
            res.status(401); res.json({ code: 401, text: 'CSRFToken!' });
            return;
        }

        // Set Timezone
        if (req.body.type === "timezone") {

            req.body.value = req.body.value.substring(0, 100);

            if (this.module.tz.zone(req.body.value)) {
                req.session[this.sessionVars.timezone] = req.body.value;
            }

        }

        // Set Manual Timezone
        else if (req.body.type === "primary_timezone") {

            req.body.value = req.body.value.substring(0, 100);

            if (this.module.tz.zone(req.body.value)) {
                req.session[this.sessionVars.primary_timezone] = req.body.value;
            } else {
                req.session[this.sessionVars.primary_timezone] = 'auto';
            }

        }

        // Set Secondary Timezone
        else if (req.body.type === "secondary_timezone") {

            req.body.value = req.body.value.substring(0, 100);

            if (this.module.tz.zone(req.body.value)) {
                req.session[this.sessionVars.secondary_timezone] = req.body.value;
            } else {
                req.session[this.sessionVars.secondary_timezone] = 'auto';
            }

        }

        // 24 Clock
        else if (req.body.type === "clock24") {
            if (req.body.value === "on" || req.body.value === "off") {
                req.session[this.sessionVars.clock24] = req.body.value;
            }
        }

        // Result
        return res.json({ success: true });

    }

    // Nope
    else {

        // Result
        res.status(400);
        return res.json({ success: false, error: 'Invalid request!', code: 400 });

    }

};