const https = require('https');
const cheerio = require('cheerio');
const config = require('./config');

module.exports = {

    async getBuyLimit_ItemUri(buylimit) {
        try {
            const data = await config.parseHTTPS(config.BUY_LIMIT_URI);
            const $ = cheerio.load(data);
            const itemUris = [];

            switch (buylimit) {
                case 'VERY_LOW':
                    ($('table[class="wikitable sortable"]').each((i, ele) => {
                        $(ele).children('tbody').children().each((i, childEle) => {
                            if (config.BUY_LIMITS_VERY_LOW.indexOf($(childEle).children().last().text()) !== -1) {
                                itemUris.push(config.runescapeWikiExtension($(childEle).children().first().children('a').attr('href')));
                            }
                        })
                    }));
                    break;
                case 'LOW':
                    ($('table[class="wikitable sortable"]').each((i, ele) => {
                        $(ele).children('tbody').children().each((i, childEle) => {
                            if (config.BUY_LIMITS_LOW.indexOf($(childEle).children().last().text()) !== -1) {
                                itemUris.push(config.runescapeWikiExtension($(childEle).children().first().children('a').attr('href')));
                            }
                        })
                    }));
                    break;
                case 'MED':
                    ($('table[class="wikitable sortable"]').each((i, ele) => {
                        $(ele).children('tbody').children().each((i, childEle) => {
                            if (config.BUY_LIMITS_MED.indexOf($(childEle).children().last().text()) !== -1) {
                                itemUris.push(config.runescapeWikiExtension($(childEle).children().first().children('a').attr('href')));
                            }
                        })
                    }));
                    break;
                case 'HIGH':
                    ($('table[class="wikitable sortable"]').each((i, ele) => {
                        $(ele).children('tbody').children().each((i, childEle) => {
                            if (config.BUY_LIMITS_HIGH.indexOf($(childEle).children().last().text()) !== -1) {
                                itemUris.push(config.runescapeWikiExtension($(childEle).children().first().children('a').attr('href')));
                            }
                        })
                    }));
                    break;
                default:
                    return Error('Please enter a valid buy-limit (Very low, low, med, high)');
            }
            return itemUris;
        } catch (err) {
            console.log(`Error occured when attempting to gather buy limit uris ${err}`);
        }
    },

    async getItemInfo(uri, type = null) {
        try {
            const data = await config.parseHTTPS(uri)
            let values = await getName(data);
            let dataUri = await getItemDataUri(data);

            await getValues(config.runescapeWikiExtension(dataUri)).then(res => {
                Object.assign(values, res);
                getBuyLimit(data).then(buylimit => {
                    Object.assign(values, buylimit);
                    if (type) {
                        Object.assign(values, { item_type: type });
                    } else {
                        Object.assign(values, { item_type: 'N/A' });
                    }
                    let info = { deviation_month: 0, deviation_three_months: 0 };
                    // getValuationData(); //then...
                });
            });
            return values;
        } catch (err) {
            console.log(`Could not find the requested information, ${err}`);
        }
    },

    async getValuationTable(dataUri) {
        try {
            let values = await getTable(config.parseHTTPS(dataUri));
            if (values.length >= 90) {
                return values.slice(0, 90);
            }
            return values;
        } catch (err) {
            console.log(`Could not get the information pertaining to the given element ${err}`);
        }
    },

    async chooseRandomInfo(arr) {
        chosenArr = [];
        for (populate = 0; populate < config.LISTING_NUM; populate++) {
            let chosen = Math.floor(Math.random() * arr.length);
            chosenArr.push(arr[chosen]);
            arr = config.removeArrElement(arr, chosen);
        }
        return [arr, chosenArr];
    }
}

// Information gathering functions

async function getName(data) {
    try {
        const $ = cheerio.load(data);
        return { item_name: $('.gemw-name').text() };
    } catch (err) {
        console.log(`Could not find requested name ${err}`);
    }
}

async function getBuyLimit(data) {
    try {
        const $ = cheerio.load(data);
        return { buy_limit: $('#exchange-limit').text() }
    } catch (err) {
        console.log(`Could not find requested buy limit information ${err}`);
    }
}

function getItemDataUri(data) {
    return new Promise((resolve, reject) => {
        const $ = cheerio.load(data);
        let node = $('a');

        if (!node) {
            return reject(new Error('Could not find item uri'));
        }

        $(node).each((index, ele) => {
            if ($(ele).text() === 'Historical price data') {
                return resolve($(ele).attr('href'));
            }
        })
    })
}

async function getValues(uri) {
    try {
        let data = await config.parseHTTPS(uri);
        let values = await getTable(data);

        if (values.length >= 90) {
            // Return 1-day, 3-day, 7-day, 30-day and 90-day prices
            return resolve({
                price_one_day: values[90],
                price_three_day: values[87],
                price_week: values[83],
                price_month: values[60],
                price_three_months: values[0]
            });
        } else {
            let len = values.length - 1;
            return resolve({
                price_one_day: values[len],
                price_three_day: values[len - 3],
                price_week: values[len - 7],
                price_month: values[len - 30],
                price_three_months: values[len - 90]
            })
        }
    } catch (err) {
        console.log(`Could not find the selected price data ${err}`);
    }
}

async function getTable(data) {
    try {
        const $ = cheerio.load(data);
        let valueInfo;
        let node = $('pre', 'div[id=mw-content-text]');

        if ($(node).hasClass('mw-code mw-script')) {
            valueInfo = $(node).text().split(',');
            valueInfo = config.conditionalSlice(valueInfo);
            valueInfo = valueInfo.map(value => {
                return value.split(':')[1].match(/\d+/g)[0];
            });
        } else {
            valueInfo = $(node).children().text();
            valueInfo = valueInfo.replace(/\d+:/g, '').replace(/[{}A-Z]/gi, '').split("','");
            valueInfo[valueInfo.length - 1] = valueInfo[valueInfo.length - 1].replace(/'/g, '');
            valueInfo = config.conditionalSlice(valueInfo);
        }
        return valueInfo;
    } catch (err) {
        console.log(`Could not access the data table for the selected item ${err}`);
    }
}