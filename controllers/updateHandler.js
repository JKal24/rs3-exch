const { fullUpdateItems, partialUpdateItems } = require('../data/infoParser');
const { startUpdate, canBeUpdated, finishUpdate } = require('../data/update');

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

    const lastUpdateCount = await startUpdate();
    const day = (new Date()).getDate();

    if (day == 1 || lastUpdateCount == 0) {
        await fullUpdateItems();
    } else {
        await partialUpdateItems();
    }
    
    await finishUpdate();
}