const https = require('https');
const cheerio = require('cheerio');
const BUY_LIMITS_VERY_LOW = ['1', '2', '5', '10']
const BUY_LIMITS_LOW = ['50', '100', '120', '150', '175', '200', '240', '250', '300', '400', '480', '500']
const BUY_LIMITS_MED = ['1000', '1500', '2000', '5000'];
const BUY_LIMITS_HIGH = ['10000', '20000', '25000', '28000', '30000'];
let data = null;

module.exports = {

    populateItemsByBuyLimit(buylimit) {
        https.get('https://runescape.wiki/w/Calculator:Grand_Exchange_buying_limits', (res) => {
            if (data == null) {
                data = '';

                // Gather information from uri
                res.on("data", (chunk) => {
                    data += chunk;
                });

                res.on("end", () => {
                    const $ = cheerio.load(data);

                    $("table[class='wikitable sortable']").each((i, ele) => {
                        $(ele).children('tbody').children().each((i, e) => {
                            switch (buylimit) {
                                case 'VERY_LOW':
                                    if (BUY_LIMITS_VERY_LOW.indexOf($(e).children().last().text()) !== -1) {
                                        // copy the entries onto database $(e).children().first().children('a').attr('href');
                                        console.log('hey');
                                    }
                                    break;
    
                                case 'LOW':
                                    if (BUY_LIMITS_LOW.indexOf($(e).children().last().text()) !== -1) {
                                        // copy the entries onto database
                                    }
                                    break;
    
                                case 'MEDIUM':
                                    if (BUY_LIMITS_MEDIUM.indexOf($(e).children().last().text()) !== -1) {
                                        // copy the entries onto database
                                    }
                                    break;
    
                                case 'HIGH':
                                    if (BUY_LIMITS_HIGH.indexOf($(e).children().last().text()) !== -1) {
                                        // copy the entries onto database
                                    }
                                    break;
                            }
                        });
                    });
                    // Look for an item with specific buy limits and input it into our mongoDB table.
                });

                res.on("error", (err) => {
                    console.log(err);
                })
            }
        })
    },

    async getItems() {

    },

    async sortItems(req, res) {

    },

    async createBuyLimitItem(req) {
        const item = buyLimit.create({
            name: req.name,
            type: req.type,
            priceOneDay: { type: Number, required: true },
            priceThreeDay: Number,
            priceWeek: Number,
            priceMonth: Number,
            buylimit: { type: Number, required: true }
        })
    }
}