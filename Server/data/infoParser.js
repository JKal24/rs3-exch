const cheerio = require('cheerio');
const config = require('../utils/config');
const priceDataParser = require('./priceDataParser');
const commands = require('../database/commands');

module.exports = {

    async initializeItems() {
        const data = await config.parseHTTPS(config.ITEM_BY_TYPE_URI);
        const $ = cheerio.load(data);

        /**
         * Records all the items by skill, looks for the exchange uri.
         */
        for (const title of $('h3')) {
            if ($(title).children().first().attr('id') === 'Items_by_skill') {
                const h3 = $(title).next().children('dd').first().children('table').first().children('tbody').first().children('tr');

                /**
                 * Do each skill type one at a time
                 * Entries need to be throttled due to API restrictions, cannot be run concurrently.
                 */

                for (const tr of $(title).next().children('dd').first().children('table').first().children('tbody').first().children('tr')) {

                    const type = config.standardTypeColumn($(tr).children('td:nth-child(2)').children().first().text());
                    const uri = $(tr).children('td:nth-child(2)').children().first().attr('href');

                    if (uri && type != 'Construction flatpacks') {
                        await parse_type_uris(config.runescapeWikiBaseLink(uri), type);
                    }
                }
            }
        }


        // Other items entry - Treasure Trails

        let t_trails_uri = config.runescapeWikiBaseLink($('a:contains("Treasure Trails")').attr('href'));
        parse_type_uris(t_trails_uri, "Treasure Trails");
    },

    async updateItems() {
        if (!can_be_updated) {
            return;
        }
        const ids = await commands.get_item_ids();

        for (let id in ids) {
            const currentID = ids[id];
            const price_info = await parse_api(currentID);

            commands.update_item(price_info, currentID);
        }
    }
}

async function can_be_updated() {
    const runedate = await config.parseHTTPS('https://secure.runescape.com/m=itemdb_rs/api/info.json').lastConfigUpdateRuneday;
    const currentRuneDate = await commands.get_update();
    if (runedate == currentRuneDate) {
        return false;
    }

    await commands.clean_update();
    await commands.add_update(runedate);
    return true;
}

async function parse_type_uris(uri, type) {
    const data = await config.parseHTTPS(uri);
    const $ = cheerio.load(data);

    for (const h2 of $('h2')) {
        const sub_type = $(h2).children('span').first().text();
        if (sub_type) {

            let node = $(h2).next()[0];
            while (node != null && node.name != 'h2') {
                if (node.name == 'table') {

                    const rows = $(node).children('tbody').first().children('tr');
                    for (const row of rows) {
                    /**
                        * Array formulation.
                        * 
                        *item_id
                        *prices
                        *valuation_week
                        *valuation_month
                        *valuation_long_term
                        *cvar_week
                        *cvar_month
                        *cvar_long_term
                        *highest_price_week
                        *lowest_price_week
                        *item_name
                        *item_image_uri
                        *buy_limit
                        *item_type
                        *item_sub_type
                        *
                        * Creates an object for each item
                        * with the array attributes.
                        */
                        const columns = $(row).children('td');
                        const lastIndex = columns.length - 1;

                        const item_image_uri = $(row).children('td:nth-child(1)').children('a').first().children('img').attr('src');
                        if (item_image_uri) {
 
                            const item_uri = config.runescapeWikiBaseLink($(columns[lastIndex - 1]).children('a').attr('href'));
                            let attributes = await parse_exchange_uris(item_uri);
 
                            attributes = attributes.concat([
                                $(columns[1]).text(),
                                config.runescapeWikiBaseLink(item_image_uri),
                                config.parseInteger($(columns[lastIndex - 3]).text()),
                                type, sub_type]);
 
                            commands.add_item(attributes);
                        }
                    }
                }
                node = $(node).next()[0];
            }
        }
    }
}

async function parse_exchange_uris(uri) {
    const data = await config.parseHTTPS(uri);
    const $ = cheerio.load(data);
    const item_id = $('#exchange-itemid').text();
    return [config.parseInteger(item_id)].concat(await parse_api(item_id));
}

async function parse_api(id) {
    let prices = await parse_prices(id);

    let data_arr = priceDataParser.doCalculations(prices)
    let concat_arr = [prices.slice(prices.length - 30)].concat(data_arr);

    return concat_arr;
}

async function parse_prices(id) {
    // API is called
    const data = await config.parseHTTPS(config.apiItemGraph(id));

    // Data is throttled
    return await throttle().then(() => {
        const json_data = Object.values(JSON.parse(data)['daily']);
        return json_data.slice(json_data.length - 90);
    })
}

async function throttle(ms = 6000) {
    await new Promise((r) => setTimeout(r, ms));
}