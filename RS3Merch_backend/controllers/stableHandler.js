const infoParser = require('../utils/infoParser');
const commands = require('../database/commands');
const dataManipulator = require('../utils/priceDataManipulator');

module.exports = {

    async initializeStable(req, res) {
        /**
        * Before adding in our items, make sure that the item_uris table is empty
        * and does not have any data from a previous instance
        */
        await commands.clearTable('item_uris');

        await infoParser.getBuyLimit_item_uris('STABLE');

        return res.json(await this.populateItems());
    },

    async nextPage(req, res) {
        return res.json(await this.populateItems());
    },

    async populateItems() {

        // Select a number of uris based on the defined limit per page.
        let ids = await commands.getAllID_item_uris();
        const len = dataManipulator.ITEMS_PER_PAGE < ids.length ? dataManipulator.ITEMS_PER_PAGE : ids.length;

        /**
         * Before adding in our items, make sure that the item table is empty
         * and does not have any data from a previous instance.
         */

        await commands.clearTable('items');

        /**
         * For each uri, add the respective item to the items table,
         * evaluate each item based on the stable conditions defined
         * in the manipulator.
         */
        let populate = 0;
        while (populate < len) {
            const info = await infoParser.getItemInfo(await commands.consume_item_uris(ids[Math.floor(Math.random() * ids.length)]));
            if (dataManipulator.evaluateStable(info)) {
                await commands.addToTable_items(dataManipulator.trimData(info));
                populate++;
            }
        }

        return await commands.getAll_items();
    }
}