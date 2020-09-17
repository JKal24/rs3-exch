const infoParser = require('../utils/infoParser');
const commands = require('../database/commands');
const dataManipulator = require('../utils/priceDataManipulator');
const config = require('../utils/config');

module.exports = {

    async showBuyLimits(req, res) {
        return res.json(Object.keys(config.buyLimits));
    },

    async initializeBuyLimit(req, res) {
        /**
         * Before adding in our uris, make sure that the item_uris table is empty
         * and does not have any data from a previous instance
         */

        await commands.clearTable_item_uris();

        await infoParser.getByBuyLimit_item_uris(req.params.buy_limit);
    },

    async createPage(req, res) {
        return res.json(await dataManipulator.populateItems('ORDINARY'));
    },
}