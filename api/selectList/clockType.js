module.exports = function (option, items = {
    off: '12 Hours',
    on: '24 Hours'
}) {

    // Options
    const options = [];
    for (const item in items) {

        // Insert Data
        const insertData = {
            name: items[item],
            value: item
        };

        // Selected
        if (item === option) {
            insertData.selected = true;
        } else {
            insertData.selected = false;
        }

        options.push(insertData);

    }

    // Return Data
    return options;

};