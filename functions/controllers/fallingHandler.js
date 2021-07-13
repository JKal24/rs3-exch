const { get_item_by_falling } = require('../database/commands');

const weeklyBound = 0.99;
const monthlyBound = 0.985;

module.exports = {
    async createPage(req, res) {
        res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
        res.send(await get_item_by_falling(weeklyBound, monthlyBound));
    }
}