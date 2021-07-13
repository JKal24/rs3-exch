const config = require('../utils/config');
const { get_item_by_buy_limit } = require('../database/commands');

module.exports = {

    async showBuyLimits(req, res) {
        return res.json(Object.keys(config.buyLimits));
    },

    async createPage(req, res) {
        const limits = config.buyLimits[req.params.buylimit];
        res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
        res.send(await get_item_by_buy_limit(limits[0], limits[limits.length - 1]));
    }
}