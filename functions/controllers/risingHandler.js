const { get_item_by_rising } = require('../database/commands');

const weeklyBound = 1.01;
const monthlyBound = 1.015;

module.exports = {
    async createPage(req, res) {
        res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
        res.send(await get_item_by_rising(weeklyBound, monthlyBound));
    }
}