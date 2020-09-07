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
                case 'VERY_LOW':
                    ($('table[class="wikitable sortable"]').each((i, ele) => {
                        $(ele).children('tbody').children().each(async (i, childEle) => {
                            if (config.BUY_LIMITS_VERY_LOW.indexOf($(childEle).children().last().text()) !== -1) {
                                await commands.addToTable_item_uris(config.runescapeWikiBaseLink($(childEle).children().first().children('a').attr('href')));
                            }
                        })
                    }));
                    break;
                case 'LOW':
                    ($('table[class="wikitable sortable"]').each((i, ele) => {
                        $(ele).children('tbody').children().each(async (i, childEle) => {
                            if (config.BUY_LIMITS_LOW.indexOf($(childEle).children().last().text()) !== -1) {
                                await commands.addToTable_item_uris(config.runescapeWikiBaseLink($(childEle).children().first().children('a').attr('href')));
                            }
                        })
                    }));
                    break;
                case 'MED':
                    ($('table[class="wikitable sortable"]').each((i, ele) => {
                        $(ele).children('tbody').children().each(async (i, childEle) => {
                            if (config.BUY_LIMITS_MED.indexOf($(childEle).children().last().text()) !== -1) {
                                await commands.addToTable_item_uris(config.runescapeWikiBaseLink($(childEle).children().first().children('a').attr('href')));
                            }
                        })
                    }));
                    break;
                case 'HIGH':
                    ($('table[class="wikitable sortable"]').each((i, ele) => {
                        $(ele).children('tbody').children().each(async (i, childEle) => {
                            if (config.BUY_LIMITS_HIGH.indexOf($(childEle).children().last().text()) !== -1) {
                                await commands.addToTable_item_uris(config.runescapeWikiBaseLink($(childEle).children().first().children('a').attr('href')));
                            }
                        })
                    }));
                    break;
                case 'ALL':
                    ($('table[class="wikitable sortable"]').each((i, ele) => {
                        $(ele).children('tbody').children().each(async (i, childEle) => {
                            await commands.addToTable_item_uris(config.runescapeWikiBaseLink($(childEle).children().first().children('a').attr('href')));

                        })
                    }));
                    break;
                case 'STABLE':
                    ($('table[class="wikitable sortable"]').each((i, ele) => {
                        $(ele).children('tbody').children().each(async (i, childEle) => {
                            if (config.BUY_LIMITS_VERY_LOW.indexOf($(childEle).children().last().text()) === -1) {
                                await commands.addToTable_item_uris(config.runescapeWikiBaseLink($(childEle).children().first().children('a').attr('href')));
                            }
                        })
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
            const data = config.parseHTTPS(config.ITEM_BY_TYPE_URI);
            const $ = cheerio.load(data);

            console.log($('tbody'));
        } catch (err) {
            throw Error(`Error occured when attempting to gather type uris ${err}`);
        }
    },

    async getItemInfo(uri) {
        try {
            const data = await config.parseHTTPS(uri)
            let values = await getName(data);

            await getBaseValues(config.exchangeToModuleData(uri)).then(async res => {
                Object.assign(values, await getItem_img_uri(data),  await getBuyLimit(data), res);
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
            return { item_image_uri: config.runescapeWikiBaseLink($('.gemw-image').children('a').children('img').attr('src'))}
        }
        return { item_image_uri: config.runescapeWikiBaseLink($('.gemw-image').children('a').children('img').attr('data-cfsrc'))}
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