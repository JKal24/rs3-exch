const commands = require('../database/commands');
const { getRunedate } = require('../utils/config');

module.exports = {
    async canBeUpdated() {
        const update = await commands.get_update();
        const runedate = await getRunedate();

        return update ? runedate != update.runedate && runedate != -1 : true;
    },

    async getUpdateCount() {
        const update = await commands.get_update();
        return update ? update.item_count : 0;
    },

    async startUpdate(clean, count) {
        if (clean) await commands.clean_update();
        const runedate = await getRunedate();
        await commands.add_update(runedate, count);
    },

    // Updates a new value for the item count

    async finishUpdate() {
        const update = await commands.get_update();
        const newCount = await commands.get_current_items_count();

        await commands.add_update(update.runedate, newCount);
    }
}