module.exports = {
    async can_be_updated() {
        const runedate = await config.parseHTTPS('https://secure.runescape.com/m=itemdb_rs/api/info.json').lastConfigUpdateRuneday;
        const currentRuneDate = await commands.get_update();
        if (runedate == currentRuneDate) {
            return false;
        }
    
        await commands.clean_update();
        await commands.add_update(runedate);
        return true;
    },

    async throttle(ms) {
        await new Promise((r) => setTimeout(r, ms));
    }
}