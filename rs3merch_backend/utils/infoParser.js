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

                case 'VERY_LOW':
                    ($('table[class="wikitable sortable"]>tbody>tr').each(async (index, ele) => {
                        if (config.buyLimits.BUY_LIMITS_VERY_LOW.indexOf($(childEle).children().last().text()) !== -1) {
                            await commands.addToTable_item_uris(config.runescapeWikiBaseLink($(ele).children().first().children('a').attr('href')));
                        }
                    }));
                    break;

                case 'LOW':
                    ($('table[class="wikitable sortable"]>tbody>tr').each(async (index, ele) => {
                        if (config.buyLimits.BUY_LIMITS_LOW.indexOf($(ele).children().last().text()) !== -1) {
                            await commands.addToTable_item_uris(config.runescapeWikiBaseLink($(ele).children().first().children('a').attr('href')));
                        }
                    }));
                    break;

                case 'MED':
                    ($('table[class="wikitable sortable"]>tbody>tr').each(async (index, ele) => {
                        if (config.buyLimits.BUY_LIMITS_MED.indexOf($(childEle).children().last().text()) !== -1) {
                            await commands.addToTable_item_uris(config.runescapeWikiBaseLink($(ele).children().first().children('a').attr('href')));
                        }
                    }));
                    break;

                case 'HIGH':
                    ($('table[class="wikitable sortable"]>tbody>tr').each(async (index, ele) => {
                        if (config.buyLimits.BUY_LIMITS_HIGH.indexOf($(childEle).children().last().text()) !== -1) {
                            await commands.addToTable_item_uris(config.runescapeWikiBaseLink($(ele).children().first().children('a').attr('href')));
                        }
                    }));
                    break;

                case 'ALL':
                    ($('table[class="wikitable sortable"]>tbody>tr').each(async (index, ele) => {
                        await commands.addToTable_item_uris(config.runescapeWikiBaseLink($(ele).children().first().children('a').attr('href')));
                    }));
                    break;

                case 'STABLE':
                    ($('table[class="wikitable sortable"]>tbody>tr').each(async (index, ele) => {
                        if (config.buyLimits.BUY_LIMITS_VERY_LOW.indexOf($(childEle).children().last().text()) === -1) {
                            await commands.addToTable_item_uris(config.runescapeWikiBaseLink($(ele).children().first().children('a').attr('href')));
                        }
                    }));
                    break;

                default:
                    throw Error('Please enter a valid buy-limit (Very low, low, med, high)');
            }
        } catch (err) {
            throw Error(`Error occured when attempting to gather buy limit uris ${err}`);
        }
    },

    async getByType_item_uris(type) {
        try {
            const data = await config.parseHTTPS(config.ITEM_BY_TYPE_URI);
            const $ = cheerio.load(data);

            $('tr').each(async (i, row) => {
                if (config.standardTypes[type].hasOwnProperty($(row).children().first().children('a').attr('title'))) {
                    await compile_type_uris(config.runescapeWikiBaseLink($(row).children('td:nth-child(2)').children('a').attr('href')),
                        // Array of columns that represent each subsection for the item type 
                        config.standardTypes[type][$(row).children().first().children('a').attr('title')]);
                }
            })
        } catch (err) {
            throw Error(`Error occured when attempting to gather type uris ${err}`);
        }
    },

    async getBySearch_item_uris(keyword) {
        try {
            const data = await config.parseHTTPS(config.BUY_LIMIT_URI);
            const $ = cheerio.load(data);
            const keywordRegex = new RegExp(keyword);

            ($('table[class="wikitable sortable"]>tbody>tr').each(async (index, tr) => {
                if ($(tr).children('td').first().text().match(keywordRegex)) {
                    await commands.addToTable_item_uris(config.runescapeWikiBaseLink($(tr).children().first().children('a').attr('href')));
                }
            }));
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

    async getItemInfo(uri) {
        try {
            const data = await config.parseHTTPS(uri);
            let values = await getName(data);

            await getBaseValues(config.exchangeToModuleData(uri)).then(async res => {
                Object.assign(values, await getItem_img_uri(data), await getBuyLimit(data), res);
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
    },
}

// Information gathering functions

async function getName(data) {
    try {
        const $ = cheerio.load(data);
        return { item_name: $('.gemw-name').text() };
    } catch (err) {
        throw Error(`Could not find requested name ${err}`);
    }
}

async function getBuyLimit(data) {
    try {
        const $ = cheerio.load(data);
        return { buy_limit: parseInt($('#exchange-limit').text()) }
    } catch (err) {
        throw Error(`Could not find requested buy limit information ${err}`);
    }
}

async function getItem_img_uri(data) {
    try {
        const $ = cheerio.load(data);
        const node_src = $('p[class="gemw-image inventory-image"]').children('a').children('img').attr('src');
        if (node_src) {
            return { item_image_uri: config.runescapeWikiBaseLink($('.gemw-image').children('a').children('img').attr('src')) }
        }
        return { item_image_uri: config.runescapeWikiBaseLink($('.gemw-image').children('a').children('img').attr('data-cfsrc')) }
    } catch (err) {
        throw Error(`Could not find image for the respective item ${err}`);
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

async function compile_type_uris(uri, columns) {
    try {
        const data = await config.parseHTTPS(uri);
        const $ = cheerio.load(data);

        /**
         * Parses through a type page by looking at the table titles or table subtitles
         * and then matches the title to the ones listed in the standard types contained
         * in config. Will then extract all valid item uris.
         */

        $('h3').each((i, ele) => {
            if (columns.indexOf($(ele).children('span').first().text()) !== -1) {
                // Parse through the children rows to get each item
                $(ele).next().children('tbody').children('tr').each(async (i, tr) => {
                    const uriExtension = $(tr).children('td:nth-child(9)').children('a').attr('href');
                    if (uriExtension) {
                        await commands.addToTable_item_uris(config.runescapeWikiBaseLink($(tr).children('td:nth-child(9)').children('a').attr('href')));
                    }
                })
            }
        })

        $('h2').each((i, ele) => {
            if (columns.indexOf($(ele).children('span').first().text()) !== -1) {
                // Parse through the children rows to get each item
                $(ele).next().children('tbody').children('tr').each(async (i, tr) => {
                    const uriExtension = $(tr).children('td:nth-child(9)').children('a').attr('href');
                    if (uriExtension) {
                        await commands.addToTable_item_uris(config.runescapeWikiBaseLink($(tr).children('td:nth-child(9)').children('a').attr('href')));
                    }
                })
            }
        })

    } catch (err) {
        throw Error(`Could not find the requested type of items ${err}`);
    }
}