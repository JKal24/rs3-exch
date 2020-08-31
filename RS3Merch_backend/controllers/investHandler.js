const cheerio = require('cheerio');
const infoUtil = require('../utils/getItemInfo');

module.exports = {
    async findInvestments() {
        const itemUris = await infoUtil.getBuyLimit_ItemUri('LOW');

        console.dir(itemUris, {'maxArrayLength': null})
    }


}