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

        $('h3').each((h3_i, ele) => {
            if ($(ele).children().first().attr('id') === config.ALL_ITEM_TYPES_ID) {

                $(ele).next().children('dd').children('table').children('tbody').children('tr').each(async (tr_i, tr) => {

                    const type = config.standardTypeColumn($(tr).children('td').first().children('a').attr('href'));
                    const uri = $(tr).children('td:nth-child(2)').children('a').attr('href');
                    if (uri) {
                        await parse_type_uris(uri, type);
                    }
                })
            }
        })

        // Other items entry - Treasure Trails

        let t_trails_uri = $('a:contains("Treasure Trails")').attr('href');
        await parse_type_uris(t_trails_uri, "Treasure Trails");
    },

    async updateItems() {
        if (!can_be_updated) {
            return;
        }
        const ids = await commands.get_item_ids();

        for (let id in ids) {
            const initialTime = (new Date()).getTime();
            
            const currentID = ids[id];
            const price_info = await parse_api(currentID);
            await commands.update_item(price_info, currentID);

            // Pauses for 5 seconds before issuing next call, this is due to Runescape API throttling.
            await throttle(initialTime, 5);
        }
    },
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

    $('h2').each(async (i_h2, h2) => {
        const sub_type = $(h2).children('span').first().text();
        if (sub_type) {

            $(h2).next.children('tbody').children('tr').each(async (i_row, row) => {

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

                const item_image_uri = $(row).children('td:nth-child(1)').children('a').attr('href');
                if (item_image_uri) {
                    let attributes = await parse_exchange_uris(uri);
                    const initialTime = (new Date()).getTime();

                    attributes = attributes.concat([
                        $(row).children('td:nth-child(2)').text(), 
                        $(row).children('td:nth-child(9)').children('a').attr('href'),
                        (tr).children('td:nth-child(7)').text(),
                        type, sub_type]);
                    commands.add_item(attributes);

                    await throttle(initialTime, 5);
                }
            })

        }
    })
}

async function parse_exchange_uris(uri) {
    const data = await config.parseHTTPS(uri);
    const $ = cheerio.load(data);

    const item_id = $('#exchange-itemid').text();
    return [item_id, parse_api(item_id)];
}

async function parse_api(id) {
    let prices = parse_prices(id);

    let data_arr = priceDataParser.doCalculations(prices)
    let concat_arr = [prices.slice(prices.length - 30)].concat(data_arr);

    return concat_arr;
}

async function parse_prices(id) {
    const data = await config.parseHTTPS(config.apiItemGraph(id));

    const json_data = Object.values(JSON.parse(data)['daily']);
    return json_data.slice(json_data.length - 90);
}

async function compile_invest_stable_uris(uris, filter) {
    await Promise.all(uris.map(async (uri) => {
        const data = await config.parseHTTPS(uri);
        const $ = cheerio.load(data);

        gatherInfo = async (evaluator) => {
            $('table[class="wikitable sortable"]>tbody>tr').each(async (index, tr) => {
                const price = stringToFloat($(tr).children('td:nth-child(3)').text());
                const buylimit = $(tr).children('td:nth-child(7)').text();
                const uriExtension = $(tr).children('td:nth-child(9)').children('a').attr('href');
                if (uriExtension) {
                    if (evaluator(price, stringToFloat(buylimit))) { await commands.addToTable_item_uris(config.runescapeWikiBaseLink(uriExtension), buylimit) }
                }
            })
        }

        stringToFloat = (value) => {
            return parseFloat(value.replace(/,/g, ''));
        }

        invest_condition = (price, buylimit) => {
            return (price > 1500 && buylimit <= 5000 && buylimit >= 1000 ||
                price > 2500 && buylimit < 1000 && buylimit >= 400 ||
                price > 5000 && buylimit < 400);
        }

        stable_condition = (price, buylimit) => {
            return (price > 300 && price <= 5000 && buylimit >= 10000 ||
                price > 600 && buylimit < 10000 && buylimit >= 5000);
        }

        switch (filter) {
            case 'INVEST':
                await gatherInfo(invest_condition);
                return;

            case 'STABLE':
                await gatherInfo(stable_condition);
                return;
        }
    }));
}

async function throttle(date, timeout) {
    const newDate = (new Date()).getTime();
    const adjustedTimeout = (timeout - (newDate - date)) * 1000;
    await new Promise(resolve => setTimeout(resolve, adjustedTimeout));
}