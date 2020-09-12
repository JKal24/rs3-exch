const infoParser = require('../utils/infoParser');
const dataManipulator = require('../utils/priceDataManipulator');

module.exports = {
    async initializeSearch(res, req) {
        /**
         * Before adding in our items, make sure that the item_uris table is empty
         * and does not have any data from a previous instance
         */
        await commands.clearTable_item_uris();

        infoParser.getBySearch_item_uris(req.body.keyword);
    },

    async createPage(req, res) {
        return res.json(await dataManipulator.populateInvestments());
    }
}