const { get_random_items } = require('../database/commands');

// Page limit is determined from the server, can send any limit from any file on the page limit route
const ITEMS_PER_PAGE = 10;

module.exports = {
    async createPage(req, res) {
        res.json(await get_random_items(ITEMS_PER_PAGE));
    },

    sendPageLimit(req, res) {
        return res.json(ITEMS_PER_PAGE);
    }
}