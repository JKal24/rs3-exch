const { fullUpdateItems, partialUpdateItems } = require('../data/infoParser');
const { startUpdate, getUpdateCount, canBeUpdated, finishUpdate } = require('../data/update');
const { get_count_updates } = require('../database/commands');

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
    const updateStatus = await canBeUpdated();
    if (!updateStatus) {
        return;
    }

    const updateCount = await get_count_updates();
    const lastUpdateCount = await getUpdateCount();

    if (updateCount >= 30 || lastUpdateCount == 0) {
        await startUpdate(true);
        await fullUpdateItems();

    } else {
        await startUpdate(false);
        await partialUpdateItems();
        
    }
    
    await finishUpdate();
}