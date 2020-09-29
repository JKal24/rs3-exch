const config = require('../../utils/config');
const cheerio = require('cheerio');
const infoParser = require('../../utils/infoParser');

/**
 * Tests scraping methods
 */

module.exports = {
    async extractInfoTest(uri, dataUri) {
        const begin = new Date().getTime();

        const data = await config.parseHTTPS(uri);
        const $ = cheerio.load(data);

        // Item ID
        const id = $('#exchange-itemid').text();

        const point0 = new Date().getTime();
        console.log('Time to get ID: ', point0 - begin);


        await infoParser.getItemInfo(uri);

        const point1 = new Date().getTime();
        console.log('Time to get info: ', point1 - point0);


        await infoParser.getValuationTable(dataUri);

        const point2 = new Date().getTime();
        console.log('Time to get table: ', point2 - point1);


        // Item details
        const detailURI = 'https://secure.runescape.com/m=itemdb_rs/api/catalogue/detail.json?item='
        const detailData = await config.parseHTTPS(detailURI + id);

        const point3 = new Date().getTime();

        console.log('Time to get details: ', point3 - point2);


        // Item graph
        const graphURI = 'https://secure.runescape.com/m=itemdb_rs/api/graph/'
        const graphData = await config.parseHTTPS(graphURI + id + '.json');

        const point4 = new Date().getTime();

        
        console.log('Time to get graph points: ', point4 - point3);

        return {
            id,
            detailData,
            graphData
        }
    }
}