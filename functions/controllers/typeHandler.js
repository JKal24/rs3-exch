const config = require('../utils/config');
const { get_item_by_types } = require('../database/commands');

module.exports = {

    async showTypes(req, res) {
        return res.json(config.standardTypes);
    },

    async createPage(req, res) {
        res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
        res.send(await get_item_by_types(req.params.type));
    }
} 