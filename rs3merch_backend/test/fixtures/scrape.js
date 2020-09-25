const config = require('../../utils/config');
const cheerio = require('cheerio');

/**
 * Tests scraping methods
 */

async function extractInfoTest(uri) {
    const data = await config.parseHTTPS(uri);
    const $ = cheerio.load(data);

    // Item ID
    const id = $('#exchange-itemid').text();

    // Item details
    const detailURI = 'https://secure.runescape.com/m=itemdb_rs/api/catalogue/detail.json?item='
    const detailData = await config.parseHTTPS(detailURI + id);

    // Item graph
    const graphURI = 'https://secure.runescape.com/m=itemdb_rs/api/graph/'
    const graphData = await config.parseHTTPS(graphURI + id + '.json');

    console.log(detailData);
    console.log(graphData);

    return {
        id,
        detailData,
        graphData
    }
},
