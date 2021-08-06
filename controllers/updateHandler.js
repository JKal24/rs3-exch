const { fullUpdateItems, partialUpdateItems } = require('../data/infoParser');
const { startUpdate, canBeUpdated, finishUpdate } = require('../data/update');
const { get_update } = require('../database/commands');
const { getRunedate } = require('../utils/config');

module.exports = {
    async updateAllItems(req, res) {
        try {
            await checkForUpdates();
            return res.json({ wasUpdated: true });
        } catch (err) {
            return res.json({ wasUpdated: false });
        }
    }
}

async function checkForUpdates() {
    const update = await get_update();
    if (!canBeUpdated(update)) {
        return;
    }

    const runedate = await getRunedate();
    const itemCount = update ? update.item_count : 0;

    if (runedate != update.runedate || itemCount == 0) {
        await startUpdate(runedate, itemCount);
        await fullUpdateItems();

    } else {
        await startUpdate(runedate, itemCount);
        await partialUpdateItems();
        
    }
    
    await finishUpdate(runedate);
}