const config = require('../utils/config');
const pool = require('../database');
const { get_item_by_buy_limit } = require('../database/query');
const logger = require('js-logger');
const JSONStream = require('JSONStream')
const path = require('path');

module.exports = {

    async showBuyLimits(req, res) {
        return res.json(Object.keys(config.buyLimits));
    },

    async createPage(req, res) {
        pool.connect((err, client, ret) => {
            if (err) {
                logger.error(err.message);
                throw new Error('Could not search item');
            } 

            const limits = config.buyLimits[req.params.buylimit]
            const query = get_item_by_buy_limit(limits[0], limits[limits.length - 1]);
            const stream = client.query(query);

            stream.pipe(JSONStream.stringify()).pipe(res);
            stream.on('end', () => {
                res.end();
                // res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
            });
        })
    }
}