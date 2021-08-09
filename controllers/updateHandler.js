const { fullUpdateItems, partialUpdateItems } = require('../data/infoParser');
const { startUpdate, canBeUpdated, finishUpdate } = require('../data/update');
const { get_update } = require('../database/commands');
const { getRunedate } = require('../utils/config');

module.exports = {
    async updateAllItems(req, res) {
        try {
            await checkForUpdates();
            return res.json({ message: true });
        } catch ({ message }) {
            res.status(500).json({ message })
        }
    }
}

async function checkForUpdates() {
    const update = await get_update();
    if (update && !canBeUpdated(update)) {
        return;
    }

    const runedate = await getRunedate();
    const updateRundate = update ? update.runedate : -1;
    const itemCount = update ? update.item_count : 0;

    if (runedate != updateRundate || itemCount == 0) {
        await startUpdate(runedate, itemCount);
        await fullUpdateItems();

    } else {
        await startUpdate(runedate, itemCount);
        await partialUpdateItems();
        
    }
    
    await finishUpdate(runedate);
}