const config = require('../utils/config');
const priceDataParser = require('./priceDataParser');
const commands = require('../database/commands');
const { can_be_updated, update, throttle } = require('./update');
const { default: Logger } = require('js-logger');

module.exports = {

    async initializeItems() {
        const $ = await config.getCheerioPage(config.ITEM_BY_TYPE_URI);

        /**
         * Records all the items by skill, looks for the exchange uri.
         */
        const titleHeaders = $('h3');
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
                        await parse_type_uris(config.runescapeWikiBaseLink(uri), type);
                    }
                }
            }
        }));

        // Other items entry - Treasure Trails

        let t_trails_uri = config.runescapeWikiBaseLink($('a:contains("Treasure Trails")').attr('href'));
        await parse_existing_uris(t_trails_uri, "Treasure Trails");

        await update();
    },

    async fullUpdateItems() {
        const $ = await config.getCheerioPage(config.ITEM_BY_TYPE_URI);

        const titleHeaders = $('h3');
        await Promise.all(titleHeaders.map(async (title, i) => {
            if ($(title).children().first().attr('id') === 'Items_by_skill') {

                for (const tr of $(title).next().children('dd').first().children('table').first().children('tbody').first().children('tr')) {

                    const type = config.capitalizeFirstLetter(
                        config.standardTypeColumn(
                            $(tr).children('td:nth-child(2)').children().first().text()));

                    const uri = $(tr).children('td:nth-child(2)').children().first().attr('href');

                    if (uri) {
                        await parse_existing_uris(config.runescapeWikiBaseLink(uri), type);
                    }
                }
            }
        }));

        await update();
    },

    async partialUpdateItems() {
        const updateStatus = await can_be_updated();
        if (!updateStatus) {
            return;
        }
        const ids = await commands.get_item_ids();

        if (ids.length == 0) {
            await module.exports.initializeItems();
            return;
        }

        await Promise.all(ids.map(async (id, i) => {
            const price_info = await parse_api(id);

            await commands.update_item(id, price_info);
        }));

        await update();
    }
}

async function parse_type_uris(uri, type) {
    const $ = await config.getCheerioPage(uri);

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
                        * Object formulation.
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
                        */
                        const columns = $(row).children('td');
                        const lastIndex = columns.length - 1;

                        // Only valid rows contain images of items
                        const itemImageUri = $(row).children('td:nth-child(1)').children('a').first().children('img').attr('src') ||
                            $(row).children('td:nth-child(1)').children('a').first().children('img').attr('data-cfsrc');
                        const price = config.parseInteger($(row).children('td:nth-child(3)').text());
                        // Checks if item price is at least above 100 gold.
                        if (item_image_uri && price > 100) {

                            const item_uri = config.runescapeWikiBaseLink($(columns[lastIndex - 1]).children('a').attr('href'));
                            let attributes = await parse_exchange_uris(item_uri);

                            attributes = Object.assign(attributes, {
                                item_name: $(columns[1]).text().toLowerCase(),
                                item_image_uri: config.runescapeWikiBaseLink(itemImageUri),
                                buy_limit: config.parseInteger($(columns[lastIndex - 3]).text()),
                                item_type: new Array(type),
                                item_sub_type: new Array(sub_type)
                            });

                            await commands.add_item(attributes);
                        }
                    }
                }
                node = $(node).next()[0];
            }
        }
    }
}

async function parse_existing_uris(uri, type) {
    const ids = await commands.get_item_ids();

    if (ids.length == 0) {
        parse_existing_uris(uri, type);

    } else {
        const $ = await config.getCheerioPage(uri);

        // Additional updates for adding items
        for (const h2 of $('h2')) {
            const sub_type = config.capitalizeFirstLetter($(h2).children('span').first().text());
            if (sub_type) {

                let node = $(h2).next()[0];
                while (node != null && node.name != 'h2') {
                    if (node.name == 'table') {

                        const rows = $(node).children('tbody').first().children('tr');
                        for (const row of rows) {
                            const columns = $(row).children('td');
                            const lastIndex = columns.length - 1;
                            let detailsUri = $(columns[lastIndex - 1]).children('a').attr('href');

                            if (detailsUri) {

                                detailsUri = config.runescapeWikiBaseLink(detailsUri);
                                // Adds a new items if a new ID is found
                                const returnID = await checkForNewItem(detailsUri);
                                if (!ids.includes(returnID)) {

                                    // Gathers all relevant item data
                                    const itemImageUri = $(row).children('td:nth-child(1)').children('a').first().children('img').attr('src') ||
                                        $(row).children('td:nth-child(1)').children('a').first().children('img').attr('data-cfsrc');
                                    if (itemImageUri) {
                                        // Will parse the same uri as checked however with every update, it isn't an expectation that many items will be added
                                        // Therefore the data will not be collected when checked for new items
                                        let attributes = await parse_exchange_uris(detailsUri);

                                        attributes = Object.assign(attributes, {
                                            item_name: $(columns[1]).text().toLowerCase(),
                                            item_image_uri: config.runescapeWikiBaseLink(itemImageUri),
                                            buy_limit: config.parseInteger($(columns[lastIndex - 3]).text()),
                                            item_type: new Array(type),
                                            item_sub_type: new Array(sub_type)
                                        });

                                        await commands.add_item(attributes);
                                    }
                                }
                            }
                        }
                    }
                    node = $(node).next()[0];
                }
            }
        }
    }
}

async function checkForNewItem(uri) {
    const $ = await config.getCheerioPage(uri);
    return $('#exchange-itemid').text();
}

async function parse_exchange_uris(uri) {
    const $ = await config.getCheerioPage(uri);
    const item_id = $('#exchange-itemid').text();
    return Object.assign({
        item_id,
    }, await parse_api(item_id));
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
        let dataObj = priceDataParser.doCalculations(prices)

        return Object.assign({
            prices: prices.slice(prices.length - 30),
        }, dataObj)

    } catch (exception) {
        // Catch the TypeError. Prices not available yet.

        return { prices: [], valuation_week: 0, valuation_month: 0, valuation_long_term: 0,
            cvar_week: 0, cvar_month: 0, cvar_long_term: 0, highest_price_week: 0, lowest_price_week: 0 };
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
        Logger.log('API is down & unstable or invalid ID inputted')
        return [];
    }
    // Data is throttled
}

