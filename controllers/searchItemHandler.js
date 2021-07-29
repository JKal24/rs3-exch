const pool = require('../database');
const { get_item_by_search } = require('../database/query');
const logger = require('js-logger');
const JSONStream = require('JSONStream')

module.exports = {
    createPage(req, res) {
        pool.connect((err, client, ret) => {
            if (err) {
                logger.error(err.message);
                throw new Error('Could not search item');
            } 

            const query = get_item_by_search(req.params.keyword);
            const stream = client.query(query);

            stream.pipe(JSONStream.stringify()).pipe(res);
            stream.on('end', () => {
                res.sendFile(path.join(__dirname + '/client/build/index.html'));
            });
        })
    }
}