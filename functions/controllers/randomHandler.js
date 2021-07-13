const { get_random_items } = require('../database/commands');
const { canBeUpdated, update } = require('../data/update');
const { fullUpdateItems, partialUpdateItems } = require('../data/infoParser');

const ITEMS_PER_PAGE = 10;

module.exports = {
    async createPage(req, res) {
        // Is not kept track of, will update in the background when necessary.
        // For now, it'll be kept this way since Pubsub from Firebase will not be used as the project will not be on the Blaze plan.
        checkForUpdates();

        return res.json(await get_random_items(ITEMS_PER_PAGE));
    },

    sendPageLimit(req, res) {
        return res.json(ITEMS_PER_PAGE);
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