const { get_update, clean_update, add_update, get_current_items_count } = require('../database/commands');
const { parseHTTPS } = require('../utils/config');

module.exports = {
    async canBeUpdated() {
        const update = await get_update();
        return update ? !update.complete : true;
    },

    async getUpdateCount() {
        const update = await get_update();
        return update ? update.item_count : 0;
    },

    async startUpdate(clean) {
        if (clean) await clean_update();
        const runedate = JSON.parse(await parseHTTPS('https://secure.runescape.com/m=itemdb_rs/api/info.json')).lastConfigUpdateRuneday;
        await add_update(runedate, count);
    },

    async finishUpdate() {
        const update = await get_update();
        const newCount = await get_current_items_count();

        await add_update(update.runedate, newCount, true);
    }
}