const { updateItems } = require('../data/infoParser');

module.exports = {

    async showFavorites(req, res) {
        /**
        * Grab a list of items that are favorited,
        * this is based on the user's database
        */
       
        return res.json(await commands.getFavorites());
    },

    async addFavorite(req, res) {
        return res.json(await commands.addFavorites(req.body));
    },

    async removeFavorite(req, res) {
        return res.json(await commands.removeFavorites(req.body.item_name));
    },

    async updateAllItems(req, res) {
        await updateItems();
        return res.send('Update complete.');
    }
}