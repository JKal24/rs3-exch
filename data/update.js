const commands = require('../database/commands');
const { parseHTTPS } = require('../utils/config');

module.exports = {
    async canBeUpdated() {
        const update = await commands.get_update();
        return update ? !update.complete : true;
    },

    async startUpdate() {
        const update = await commands.get_update();
        const count = update ? update.item_count : 0;
        await commands.clean_update();
        
        const runedate = JSON.parse(await parseHTTPS('https://secure.runescape.com/m=itemdb_rs/api/info.json')).lastConfigUpdateRuneday;
        await commands.add_update(runedate, count);
        return count;
    },

    async finishUpdate() {
        const update = await commands.get_update();
        const newCount = await commands.get_current_items_count();

        await commands.add_update(update.runedate, newCount, true);
    }
}