const https = require('https');
const cheerio = require('cheerio');
const pool = require('../database');
const infoUtil = require('../utils/getItemInfo');
const config = require('../utils/config');
const getItemInfo = require('../utils/getItemInfo');

const BUY_LIMITS_VERY_LOW = ['1', '2', '5', '10']
const BUY_LIMITS_LOW = ['50', '100', '120', '150', '175', '200', '240', '250', '300', '400', '480', '500']
const BUY_LIMITS_MED = ['1000', '1500', '2000', '5000'];
const BUY_LIMITS_HIGH = ['10000', '20000', '25000', '28000', '30000'];

module.exports = {

    async populateItemsByBuyLimit(buylimit) {
        let items = await getItemInfo.chooseRandom(await getItemInfo.getBuyLimit_ItemUri(buylimit));
        let chosenItems = items[1];
        items = items[0];

    }, 

    depracated_populateItemsByBuyLimit(buylimit) {
        return new Promise((resolve, reject) => {
            https.get(config.BUY_LIMIT_URI, (res) => {
                let data = '';

                // Gather information from uri
                res.on("data", (chunk) => {
                    data += chunk;
                });

                res.on("end", async () => {
                    const $ = cheerio.load(data);

                    switch (buylimit) {
                        case 'VERY_LOW':
                            $("table[class='wikitable sortable']").each(async (i, ele) => {
                                $(ele).children('tbody').children().each(async (i, e) => {
                                    if (BUY_LIMITS_VERY_LOW.indexOf($(e).children().last().text()) !== -1) {
                                        // copy the entries onto the database

                                        const uriExtensions = [];
                                        uriExtensions.push($(e).children().first().children('a').attr('href'));

                                        // await infoUtil.getItemInfo('https://runescape.wiki' + $(e).children().first().children('a').attr('href')).then(async values => {
                                            // await pool.query('INSERT INTO items (item_name, price_one_day, price_three_day, price_week, price_month, price_three_months, buy_limit, item_type, deviation_month, deviation_three_months) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *'
                                            //     , [values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[8], values[9]]
                                            // );
                                        //     console.log(values);
                                        // });



                                        console.log($(e).children().first().children('a').attr('href'));
                                    }
                                })
                            });
                            break;

                        case 'LOW':
                            if (BUY_LIMITS_LOW.indexOf($(e).children().last().text()) !== -1) {
                                // copy the entries onto database
                            }
                            break;

                        case 'MED':
                            if (BUY_LIMITS_MED.indexOf($(e).children().last().text()) !== -1) {
                                // copy the entries onto database
                            }
                            break;

                        case 'HIGH':
                            if (BUY_LIMITS_HIGH.indexOf($(e).children().last().text()) !== -1) {
                                // copy the entries onto database
                            }
                            break;

                    };
                });

                res.on("error", (err) => {
                    return reject(`Could not access information ${err}`);
                })
            })
        });
    },

    async getItems() {

    },

    async sortItems(req, res) {

    },
}