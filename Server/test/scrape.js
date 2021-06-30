const config = require('../utils/config');
const cheerio = require('cheerio');
const infoParser = require('../data/infoParser');

/**
 * Tests scraping methods
 */

async function extractInfoTest(uri, dataUri) {

    // Testing Runescape API versus Wiki Scraping

    const begin = time();

    const data = await config.parseHTTPS(uri);
    const $ = cheerio.load(data);

    // Item ID
    const id = $('#exchange-itemid').text();

    const point0 = time();


    await infoParser.getItemInfo(uri);

    const point1 = time();


    await infoParser.getValuationTable(dataUri);

    const point2 = time();


    // Item details
    const detailURI = 'https://secure.runescape.com/m=itemdb_rs/api/catalogue/detail.json?item='
    const detailData = await config.parseHTTPS(detailURI + id);

    const point3 = time();


    // Item graph
    const graphURI = 'https://secure.runescape.com/m=itemdb_rs/api/graph/'
    const graphData = await config.parseHTTPS(graphURI + id + '.json');

    const point4 = time();

    // Compare time...

    return {
        id,
        detailData,
        graphData
    }
}

function time() {
    return (new Date()).getTime();
}
