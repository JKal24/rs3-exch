const cheerio = require('cheerio');
const config = require('../utils/config');
const priceDataParser = require('./priceDataParser');
const commands = require('../database/commands');

module.exports = {

    async updateItems() {
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

    /** 
     * Creates an object for each item that has
     * the following attributes: item name, buy limit,
     * averages, co-efficient of variation, undervaluation
     * historic highs and lows and a uri to the item image.
     */

    async getItemInfo(uri, buylimit) {
        const data = await config.parseHTTPS(uri);
        let values = await getIdentifiers(data);

        await getBaseValues(config.exchangeToModuleData(uri)).then(async res => {
            Object.assign(values, { buy_limit: buylimit }, res);
        });
        return values;

    },

    async getValuationTable(dataUri, size = 90) {
        let values = await getTable(await config.parseHTTPS(dataUri));
        if (values.length >= size) {
            return values.slice(0, size);
        }
        return values;

    }
}

// Information gathering functions

async function getIdentifiers(data) {
    const $ = cheerio.load(data);
    const image_src = $('p[class="gemw-image inventory-image"]').children('a').children('img').attr('src');
    let item_image_uri;

    // Get the image src
    if (image_src) {
        item_image_uri = config.runescapeWikiBaseLink($('.gemw-image').children('a').children('img').attr('src'));
    } else {
        item_image_uri = config.runescapeWikiBaseLink($('.gemw-image').children('a').children('img').attr('data-cfsrc'))
    }

    // Return the name, id and image src bundled together
    return { item_name: $('.gemw-name').text(), item_id: $('#exchange-itemid').text(), item_image_uri };

}

async function getBaseValues(uri) {
    const data = await config.parseHTTPS(uri);
    const values = await getTable(data);
    return priceDataParser.compileData(values);

}

async function getTable(data) {
    // Scrapes data module website for a long list of prices
    const $ = cheerio.load(data);
    let node = $('pre', 'div[id=mw-content-text]');

    if ($(node).hasClass('mw-code mw-script')) {
        let valueInfo = $(node).text().split(',');
        valueInfo = config.conditionalSlice(valueInfo);
        valueInfo = valueInfo.map(value => {
            return parseInt(value.split(':')[1].match(/\d+/g)[0]);
        });
        return valueInfo;
    } else {
        let valueInfo = $(node).children().text();
        valueInfo = valueInfo.replace(/[{}A-Z]/gi, '').split("','");
        valueInfo = valueInfo.map(value => {
            return parseInt(value.split(':')[1].replace(/'/, ''));
        })
        valueInfo = config.conditionalSlice(valueInfo);
        return valueInfo;
    }

}

async function parse_type_uris(uris, type) {
    const data = await config.parseHTTPS(uri);
    const $ = cheerio.load(data);

    $('h2').each(async (i_h2, h2) => {
        const sub_type = $(h2).children('span').first().text();
        if (sub_type) {

            $(h2).next.children('tbody').children('tr').each(async (i_row, row) => {

                /**
                 * Format for the items array,
                 * [item_id,
                 * prices,
                 * undervaluation,
                 * cvar_month,
                 * cvar_week,
                 * highest_price_week,
                 * lowest_price_week,
                 * item_name,
                 * item_image_uri,
                 * buy_limit,
                 * item_type,
                 * item_sub_type]
                 */

                const item_image_uri = $(row).children('td:nth-child(1)').children('a').attr('href');
                if (item_image_uri) {
                    let attributes = await parse_exchange_uris(uri);
                    const item_name = $(row).children('td:nth-child(2)').text();
                    const uriExtension = $(tr).children('td:nth-child(9)').children('a').attr('href');
                    const buy_limit = $(tr).children('td:nth-child(7)').text();
                }
            })

        }
    })
}

async function parse_exchange_uris(uri) {
    const data = await config.parseHTTPS(uri);
    const $ = cheerio.load(data);

    const item_id = $('#exchange-itemid').text();
    const prices = parse_api_prices(item_id);
    return [item_id, parse_api_prices(item_id)];
}

async function parse_api_prices(uri) {
    const data = await config.parseHTTPS(uri);

    const json_data = JSON.parse(data)['daily'];
    setTimeout();

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