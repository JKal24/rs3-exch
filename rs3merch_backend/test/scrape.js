const config = require('../utils/config');
const cheerio = require('cheerio');
const infoParser = require('../utils/infoParser');

/**
 * Tests scraping methods
 */

async function extractInfoTest(uri, dataUri) {

    // Testing Runescape API versus Wiki Scraping

    const begin = new Date().getTime();

    const data = await config.parseHTTPS(uri);
    const $ = cheerio.load(data);

    // Item ID
    const id = $('#exchange-itemid').text();

    const point0 = new Date().getTime();


    await infoParser.getItemInfo(uri);

    const point1 = new Date().getTime();


    await infoParser.getValuationTable(dataUri);

    const point2 = new Date().getTime();


    // Item details
    const detailURI = 'https://secure.runescape.com/m=itemdb_rs/api/catalogue/detail.json?item='
    const detailData = await config.parseHTTPS(detailURI + id);

    const point3 = new Date().getTime();


    // Item graph
    const graphURI = 'https://secure.runescape.com/m=itemdb_rs/api/graph/'
    const graphData = await config.parseHTTPS(graphURI + id + '.json');

    const point4 = new Date().getTime();


    return {
        id,
        detailData,
        graphData
    }
}
