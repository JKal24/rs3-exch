const config = require('../utils/config');
const pool = require('../database/index');
const { get_item_by_types } = require('../database/query');
const logger = require('js-logger');
const JSONStream = require('JSONStream')
const { get_item_by_type } = require('../database/commands');

module.exports = {

    async showTypes(req, res) {
        return res.json(config.standardTypes);
    },

    async createPage(req, res) {
        const type = req.params.type;
        const data = await get_item_by_type(type);
        return res.send(data);
        // pool.connect((err, client, ret) => {
        //     if (err) {
        //         logger.error(err.message);
        //         throw new Error('Could not search item');
        //     } 

        //     const query = get_item_by_types(req.params.type);
        //     const stream = client.query(query);

        //     stream.pipe(JSONStream.stringify()).pipe(res);
        //     stream.on('end', () => {
        //         res.end();
        //     });
        // })
    }
} 