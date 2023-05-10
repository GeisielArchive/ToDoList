// Get current date.
exports.getDate = getDate;
exports.getDay = getDay;

function getDate() {
    const today = new Date();

    // Options for the date.
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    // Format the date with options dict (Day, month weekday). 
    return today.toLocaleDateString("en-US", options);
}

function getDay() {
    const today = new Date();

    // Options for the date.
    const options = {
        weekday: "long",
    };

    // Format the date with options dict (Day). 
    return today.toLocaleDateString("en-US", options);
}