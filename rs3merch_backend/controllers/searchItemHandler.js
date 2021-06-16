const infoParser = require('../data/infoParser');
const commands = require('../database/commands');
const dataManipulator = require('../data/priceDataManipulator');

module.exports = {

    async initializeSearch(req, res) {
        /**
         * Before adding in our items, make sure that the item_uris table is empty
         * and does not have any data from a previous instance
         */
        await commands.clearTable_item_uris();
        
        await infoParser.getBySearch_item_uris(req.params.text);
        return res.json(true);
    },

    async createPage(req, res) {
        return res.json(await dataManipulator.populateItems());
    }
}