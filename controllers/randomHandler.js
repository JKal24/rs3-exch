const { get_random_items } = require('../database/commands');
const path = require('path');

const ITEMS_PER_PAGE = 10;

module.exports = {
    async createPage(req, res) {
        return res.json(await get_random_items(ITEMS_PER_PAGE));
    },

    sendPageLimit(req, res) {
        return res.json(ITEMS_PER_PAGE);
    }
}