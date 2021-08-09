const { add_update, get_current_items_count } = require('../database/commands');
const { customDate } = require('../utils/config');

const twelveHoursInSeconds = 43200;

module.exports = {
    canBeUpdated(update) {
        const prevCustomDate = update.update_epoch;
        const newCustomDate = customDate();

        return prevCustomDate + twelveHoursInSeconds < newCustomDate;
    },

    async startUpdate(runedate, count) {
        await add_update(runedate, Date.now(), count);
    },

    // Updates a new value for the item count

    async finishUpdate(runedate) {
        const newCount = await get_current_items_count();

        await add_update(runedate, Date.now(), newCount);
    }
}