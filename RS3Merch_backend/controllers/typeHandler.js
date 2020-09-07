const config = require('../utils/config');
const dataManipulator = require('../utils/priceDataManipulator');

module.exports = {

    async initializeTypeRequests(req, res) {
        if (config.standardTypes.hasOwnProperty(req.params.type)) {
            return res.status(400).json({ message: 'Type not found!' });
        }

    },

    async nextPage(req, res) {

    },

    async populateItems() {

        // Under construction

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
         * then return this value.
         */
        let populate = 0;
        while (populate < len) {
            const info = await infoParser.getItemInfo(await commands.consume_item_uris(ids[Math.floor(Math.random() * ids.length)]));
            if (dataManipulator.evaluateOrdinary(info)) {
                await commands.addToTable_items(dataManipulator.trimData(info));
                populate++;
            }
        }

        return await commands.getAll_items();
    }
} 