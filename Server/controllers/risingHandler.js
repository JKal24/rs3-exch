const pool = require('../database');
const { get_item_by_rising } = require('../database/query');
const logger = require('js-logger');
const JSONStream = require('JSONStream')

const weeklyBound = 1.02;
const monthlyBound = 1.01;

module.exports = {
    createPage(req, res) {
        pool.connect((err, client, ret) => {
            if (err) {
                logger.error(err.message);
                throw new Error('Could not search item');
            } 

            const query = get_item_by_rising(weeklyBound, monthlyBound);
            const stream = client.query(query);

            stream.pipe(JSONStream.stringify()).pipe(res);
            stream.on('end', () => {
                res.end();
            });
        })
    }
}
