const { fullUpdateItems, partialUpdateItems } = require('../data/infoParser');
const { update, canBeUpdated } = require('../data/update');

module.exports = {
    async updateAllItems(req, res) {
        try {
            await checkForUpdates();
            return res.json({ status: 'updated' });
        } catch (err) {
            return res.json({ status: 'error' });
        }
    }
}

async function checkForUpdates() {
    const updateStatus = await canBeUpdated();
    if (!updateStatus) {
        return;
    }
    const day = (new Date()).getDate();
    await update(day);

    if (day == 1) {
        await fullUpdateItems();
    } else {
        await partialUpdateItems();
    }
}