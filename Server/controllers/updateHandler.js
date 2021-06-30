const { partialUpdateItems: updateItems } = require('../data/infoParser');

module.exports = {
    async updateAllItems(req, res) {
        await updateItems();
        return;
    }
}