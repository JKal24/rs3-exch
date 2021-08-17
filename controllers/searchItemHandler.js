const pool = require('../database');
const { get_item_by_search } = require('../database/query');
const { get_filtered_data } = require('../database/commands');
const logger = require('js-logger');
const JSONStream = require('JSONStream');

module.exports = {
    createPage(req, res) {
        try {
            pool.connect((err, client, ret) => {
                if (err) {
                    logger.error(err.message);
                    throw new Error('Could not search item');
                }

                const query = get_item_by_search(req.params.keyword);
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
    },

    async createFilterPage(req, res) {
        const { keywords, filterPrice, filterTypes, filterBuylimits} = req.params;
        const buylimits = filterBuylimits.split(",");
        const keywordsList = keywords.split(",");

        const data = await get_filtered_data(keywordsList, parseInt(filterPrice), filterTypes.split(','), parseInt(buylimits[0]), parseInt(buylimits[1]));

        res.json(data);
    }
}