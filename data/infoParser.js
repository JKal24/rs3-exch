const config = require('../utils/config');
const priceDataParser = require('./priceDataParser');
const commands = require('../database/commands');

module.exports = {

    async fullUpdateItems() {
        const $ = await config.getCheerioPage(config.ITEM_BY_TYPE_URI);

        /**
         * Records the following items by skill, looks for the exchange uri.
         */
        const titleHeaders = $('h3');

        // Checks if the item list has yet to be populated entirely, assumes >20 items must exist
        const ids = await commands.get_item_ids();
        const checkID = ids.length <= 20;

        await Promise.all(titleHeaders.map(async (title, i) => {
            if ($(title).children().first().attr('id') === 'Items_by_skill') {

                /**
                 * Do each skill type one at a time
                 * Entries need to be throttled due to API restrictions, cannot be run concurrently.
                 */

                for (const tr of $(title).next().children('dd').first().children('table').first().children('tbody').first().children('tr')) {

                    const type = config.capitalizeFirstLetter(
                        config.standardTypeColumn(
                            $(tr).children('td:nth-child(2)').children().first().text()));

                    const uri = $(tr).children('td:nth-child(2)').children().first().attr('href');

                    if (uri) {
                        await parse_type_uris(config.runescapeWikiBaseLink(uri), type, checkID);
                    }
                }
            }
        }));

        // Other items entry - Treasure Trails

        let t_trails_uri = config.runescapeWikiBaseLink($('a:contains("Treasure Trails")').attr('href'));
        await parse_type_uris(t_trails_uri, "Treasure Trails");
    },

    async partialUpdateItems() {
        const ids = await commands.get_item_ids();

        if (ids.length == 0) {
            await module.exports.fullUpdateItems();
            return;
        }

        await Promise.all(ids.map(async (id, i) => {
            const price_info = await parse_api(id);

            await commands.update_item(price_info, id);
        }));
    }
}

async function parse_type_uris(uri, type, checkID) {
    const $ = await config.getCheerioPage(uri);

    const ids = await commands.get_item_ids();

    if (ids.length == 0) {
        // Initial first update
        for (const h2 of $('h2')) {
            const sub_type = config.capitalizeFirstLetter($(h2).children('span').first().text());
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

                            // Only valid rows contain images of items
                            const item_image_uri = $(row).children('td:nth-child(1)').children('a').first().children('img').attr('src');
                            const price = config.parseInteger($(row).children('td:nth-child(3)').text());
                            // Checks if item price is at least above 100 gold.
                            if (item_image_uri && config.parseInteger($(row).children('td:nth-child(3)').text()) > 100) {

                                const item_uri = config.runescapeWikiBaseLink($(columns[lastIndex - 1]).children('a').attr('href'));
                                let attributes = await parse_exchange_uris(item_uri, checkID);

                                attributes = attributes.concat([
                                    $(columns[1]).text(),
                                    config.runescapeWikiBaseLink(item_image_uri),
                                    config.parseInteger($(columns[lastIndex - 3]).text()),
                                    new Array(type), new Array(sub_type)]);

                                await commands.add_item(attributes);
                            }
                        }
                    }
                    node = $(node).next()[0];
                }
            }
        }
    }
}

async function parse_exchange_uris(uri, checkID) {
    const $ = await config.getCheerioPage(uri);
    const item_id = $('#exchange-itemid').text();

    const item_data = checkID ? await commands.get_item_by_id(itemID) || await parseAPI(itemID) : await parseAPI(itemID);
    return [config.parseInteger(item_id)].concat(item_data);
}

async function parse_api(id) {
    let prices;

    /**
     * If a connection error occurs here then just try connecting to the API again.
     * A new throttle will be made to allow a buffer for connecting to API.
     */

    try {
        prices = await parse_prices(id);
    } catch (error) {
        prices = await parse_prices(id, 2500);
    }

    /**
     * If the prices data could not be properly accessed then an array with empty values
     * should be returned instead.
     * 
     * API access is likely down or broken.
     */

    try {
        let data_arr = priceDataParser.doCalculations(prices)
        return [prices.slice(prices.length - 30)].concat(data_arr);

    } catch (exception) {
        // Catch the TypeError.

        return [[], 0, 0, 0, 0, 0, 0, 0, 0];
    }

}

async function parse_prices(id, ms = 5500) {
    // API is called
    const data = await config.parseHTTPS(config.apiItemGraph(id));

    try {
        return await throttle(ms).then(() => {
            const json_data = Object.values(JSON.parse(data)['daily']);
            return json_data.slice(json_data.length - 90);
        })
    } catch (err) {
        // API is down & unstable or invalid ID inputted
        return [];
    }
    // Data is throttled
}

async function throttle(ms) {
    await new Promise((r) => setTimeout(r, ms));
}