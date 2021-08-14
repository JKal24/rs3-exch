const { add_update, get_current_items_count } = require('../database/commands');
const { customDate } = require('../utils/config');

// Used to compare unix times for basic update schedule
const twelveHoursInSeconds = 43200;

module.exports = {
    canBeUpdated(update) {
        // Compare unix times, decimals are not kept on storage in database (only represent <1 second)
        const prevCustomDate = parseInt(update.update_epoch);
        const newCustomDate = customDate();

        return prevCustomDate + twelveHoursInSeconds > newCustomDate;
    },

    async startUpdate(runedate, count) {
        await add_update(runedate, customDate(), count);
    },

    // Updates a new value for the item count

    async finishUpdate(runedate) {
        const newCount = await get_current_items_count();

        await add_update(runedate, customDate(), newCount);
    }
}