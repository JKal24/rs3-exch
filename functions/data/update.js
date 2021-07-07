const commands = require('../database/commands');
const { parseHTTPS } = require('../utils/config');

module.exports = {
    async can_be_updated() {
        const runedate = JSON.parse(await parseHTTPS('https://secure.runescape.com/m=itemdb_rs/api/info.json')).lastConfigUpdateRuneday;
        const currentRuneDate = await commands.get_update().runedate || '-1';
        if (runedate == parseInt(currentRuneDate)) {
            return false;
        }
    
        await commands.clean_update();
        return true;
    },

    async update() {
        await commands.clean_update();
        
        const runedate = JSON.parse(await parseHTTPS('https://secure.runescape.com/m=itemdb_rs/api/info.json')).lastConfigUpdateRuneday;
        const count = await commands.get_current_items_count();
        await commands.add_update(runedate, count);
    },

    async throttle(ms) {
        await new Promise((r) => setTimeout(r, ms));
    }
}