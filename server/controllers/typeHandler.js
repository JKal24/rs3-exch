const config = require('../utils/config');
const pool = require('../database');
const { get_item_by_types } = require('../database/query');
const logger = require('js-logger');
const JSONStream = require('JSONStream')

module.exports = {

    async showTypes(req, res) {
        console.log('getting types');
        return res.json(config.standardTypes);
    },

    async createPage(req, res) {
        pool.connect((err, client, ret) => {
            if (err) {
                logger.error(err.message);
                throw new Error('Could not search item');
            } 

            const query = get_item_by_types(req.params.type);
            const stream = client.query(query);

            stream.pipe(JSONStream.stringify()).pipe(res);
            stream.on('end', () => {
                res.end();
            });
        })
    }
} 