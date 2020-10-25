const cheerio = require('cheerio');
const config = require('./config');
const priceDataParser = require('./priceDataParser');
const commands = require('../database/commands');

module.exports = {

    async getByBuyLimit_item_uris(buylimit) {
        try {
            const data = await config.parseHTTPS(config.BUY_LIMIT_URI);
            const $ = cheerio.load(data);

            switch (buylimit) {
                /**
                 * Each case extracts the element that contains the name of the item
                 * and the buy limit of the item and tests it against the required
                 * buy limit and adds it to the database if it is acceptable.
                 */

                case 'Very_Low':
                    ($('table[class="wikitable sortable"]>tbody>tr').each(async (index, ele) => {
                        if (config.buyLimits.Very_Low.indexOf($(ele).children().last().text()) !== -1) {
                            await commands.addToTable_item_uris(
                                config.runescapeWikiBaseLink($(ele).children().first().children('a').attr('href')),
                                $(ele).children().last().text()
                            );
                        }
                    }));
                    break;

                case 'Low':
                    ($('table[class="wikitable sortable"]>tbody>tr').each(async (index, ele) => {
                        if (config.buyLimits.Low.indexOf($(ele).children().last().text()) !== -1) {
                            await commands.addToTable_item_uris(config.runescapeWikiBaseLink($(ele).children().first().children('a').attr('href')), $(ele).children().last().text());
                        }
                    }));
                    break;

                case 'Medium':
                    ($('table[class="wikitable sortable"]>tbody>tr').each(async (index, ele) => {
                        if (config.buyLimits.Medium.indexOf($(ele).children().last().text()) !== -1) {
                            await commands.addToTable_item_uris(config.runescapeWikiBaseLink($(ele).children().first().children('a').attr('href')), $(ele).children().last().text());
                        }
                    }));
                    break;

                case 'High':
                    ($('table[class="wikitable sortable"]>tbody>tr').each(async (index, ele) => {
                        if (config.buyLimits.High.indexOf($(ele).children().last().text()) !== -1) {
                            await commands.addToTable_item_uris(config.runescapeWikiBaseLink($(ele).children().first().children('a').attr('href')), $(ele).children().last().text());
                        }
                    }));
                    break;

                case 'ALL':
                    ($('table[class="wikitable sortable"]>tbody>tr').each(async (index, ele) => {
                        await commands.addToTable_item_uris(config.runescapeWikiBaseLink($(ele).children().first().children('a').attr('href')), $(ele).children().last().text());
                    }));
                    break;

                case 'STABLE':
                    ($('table[class="wikitable sortable"]>tbody>tr').each(async (index, ele) => {
                        if (config.buyLimits.Very_Low.indexOf($(ele).children().last().text()) === -1) {
                            await commands.addToTable_item_uris(config.runescapeWikiBaseLink($(ele).children().first().children('a').attr('href')), $(ele).children().last().text());
                        }
                    }));
                    break;

                default:
                    throw Error('Please enter a valid buy-limit (Very low, low, med, high)');
            }

            await commands.cleanTable_item_uris(config.runescapeWikiBaseLink('undefined'));
        } catch (err) {
            throw Error(`Error occured when attempting to gather uris ${err}`);
        }
    },

    async getByType_item_uris(type) {
        try {
            const data = await config.parseHTTPS(config.ITEM_BY_TYPE_URI);
            const $ = cheerio.load(data);
            const data_uris = [];

            $('tr').each((i, row) => {
                const property = config.standardTypeColumn($(row).children('td').first().children('a').attr('href'));
                if (config.standardTypes[type][property]) {
                    data_uris.push(config.runescapeWikiBaseLink(config.baseToMarketExchange(property)));
                }
            })
            await compile_type_uris(data_uris, type);

            await commands.cleanTable_item_uris(config.runescapeWikiBaseLink('undefined'));
        } catch (err) {
            throw Error(`Error occured when attempting to gather uris ${err}`);
        }
    },

    async getConditionalType_item_uris(filter) {
        try {
            const data = await config.parseHTTPS(config.ITEM_BY_TYPE_URI);
            const $ = cheerio.load(data);
            const data_uris = [];

            $('h3').each((i, ele) => {
                if ($(ele).children().first().attr('id') === config.ALL_ITEM_TYPES_ID) {
                    $(ele).next().children('dd').children('table').children('tbody').children('tr').each((index, tr) => {
                        const uri = $(tr).children('td:nth-child(2)').children('a').attr('href');
                        if (uri) {
                            data_uris.push(config.runescapeWikiBaseLink(uri));
                        }
                    })
                }
            })
            await compile_invest_stable_uris(data_uris, filter);

            await commands.cleanTable_item_uris(config.runescapeWikiBaseLink('undefined'));
        } catch (err) {
            throw Error(`Error occured when attempting to gather uris ${err}`);
        }
    },

    async getBySearch_item_uris(keyword) {
        try {
            const data = await config.parseHTTPS(config.BUY_LIMIT_URI);
            const $ = cheerio.load(data);
            const keywordRegex = new RegExp(keyword);

            ($('table[class="wikitable sortable"]>tbody>tr').each(async (index, tr) => {
                if ($(tr).children('td').first().text().match(keywordRegex)) {
                    await commands.addToTable_item_uris(config.runescapeWikiBaseLink($(tr).children().first().children('a').attr('href')), $(tr).children().last().text());
                }
            }));

            await commands.cleanTable_item_uris(config.runescapeWikiBaseLink('undefined'));
        } catch (err) {
            throw new Error(`Could not find any items related to the specified keyword`);
        }
    },

    /** 
     * Creates an object for each item that has
     * the following attributes: item name, buy limit,
     * averages, co-efficient of variation, undervaluation
     * historic highs and lows and a uri to the item image.
     */

    async getItemInfo(uri, buylimit) {
        try {
            const data = await config.parseHTTPS(uri);
            let values = await getIdentifiers(data);

            await getBaseValues(config.exchangeToModuleData(uri)).then(async res => {
                Object.assign(values, { buy_limit: buylimit }, res);
            });
            return values;
        } catch (err) {
            throw Error(`Could not find the requested information, ${err}`);
        }
    },

    async getValuationTable(dataUri, size = 90) {
        try {
            let values = await getTable(await config.parseHTTPS(dataUri));
            if (values.length >= size) {
                return values.slice(0, size);
            }
            return values;
        } catch (err) {
            throw Error(`Could not get the information pertaining to the given element ${err}`);
        }
    }
}

// Information gathering functions

async function getIdentifiers(data) {
    try {
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
    } catch (err) {
        throw Error(`Could not find requested name or image ${err}`);
    }
}

async function getBaseValues(uri) {
    try {
        const data = await config.parseHTTPS(uri);
        const values = await getTable(data);
        return priceDataParser.compileData(values);
    } catch (err) {
        throw Error(`Could not find the selected price data ${err}`);
    }
}

async function getTable(data) {
    try {

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
    } catch (err) {
        throw Error(`Could not access the data table for the selected item ${err}`);
    }
}

async function compile_type_uris(uris, type) {
    await Promise.all(uris.map(async (uri) => {
        const data = await config.parseHTTPS(uri);
        const $ = cheerio.load(data);
        const columns = config.standardTypes[type][config.standardTypeColumn(uri)];

        /**
        * Parses through a type page by looking at the table titles or table subtitles
        * and then matches the title to the ones listed in the standard types contained
        * in config. Will then extract all valid item uris.
        */

        const parse = async (ele) => {
            // Parse through the children rows to get each item
            $(ele).next().children('tbody').children('tr').each(async (i, tr) => {
                const uriExtension = $(tr).children('td:nth-child(9)').children('a').attr('href');
                const buy_limit = $(tr).children('td:nth-child(7)').text();
                if (uriExtension) {
                    await commands.addToTable_item_uris(config.runescapeWikiBaseLink(uriExtension), buy_limit);
                }
            })
        };

        const checkAll_parse =
            columns[0] === 'ALL' ?
                async (ele) => {
                    await parse(ele);
                }
                :
                async (ele) => {
                    if (columns.indexOf($(ele).children('span').first().text()) !== -1) {
                        await parse(ele);
                    }
                };

        $('h3').each(async (i, ele) => {
            await checkAll_parse(ele);
        })

        $('h2').each(async (i, ele) => {
            await checkAll_parse(ele);
        })
    }));
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