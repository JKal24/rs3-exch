const config = require('../utils/config');
const pool = require('../database/index');
const { get_item_by_types } = require('../database/query');
const logger = require('js-logger');
const JSONStream = require('JSONStream');

module.exports = {

    showTypes(req, res) {
        return res.json(config.standardTypes);
    },

    createPage(req, res) {
        try {
            pool.connect((err, client, ret) => {
                if (err) {
                    logger.error(err.message);
                    throw new Error('Could not search item');
                }

                const query = get_item_by_types(req.params.type);
                const stream = client.query(query);

                stream.pipe(JSONStream.stringify()).pipe(res);
                stream.on('end', () => {
                    ret();
                    res.end();
                });
            })
        } catch ({ message }) {
            res.status(500).json({ message })
        }
    }
}