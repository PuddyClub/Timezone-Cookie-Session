module.exports = function (option) {

    // Get Names
    const items = this.getNames();

    // Options
    const options = [];
    for (const item in items) {

        // Insert Data
        const insertData = {
            name: items[item].replace(/\_/g, ' '),
            value: items[item]
        };

        // Selected
        if (items[item] === option) {
            insertData.selected = true;
        } else {
            insertData.selected = false;
        }

        options.push(insertData);

    }

    // Return Data
    return options;

};