const { get_random_items } = require('../database/commands');
const path = require('path');

const ITEMS_PER_PAGE = 10;

module.exports = {
    async createPage(req, res) {
        res.json(await get_random_items(ITEMS_PER_PAGE));
        res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
    },

    sendPageLimit(req, res) {
        return res.json(ITEMS_PER_PAGE);
    }
}