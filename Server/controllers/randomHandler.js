const { get_random_items } = require('../database/commands');

const ITEMS_PER_PAGE = 5;

module.exports = {
    async createPage(req, res) {
        return res.json(await get_random_items(ITEMS_PER_PAGE));
    }
}