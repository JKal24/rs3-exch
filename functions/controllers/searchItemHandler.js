const { get_item_by_search } = require('../database/commands');

module.exports = {
    async createPage(req, res) {
        res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
        res.send(await get_item_by_search(req.params.keyword));
    }
}