const pool = require("./index");

module.exports = {
    async addToTable_item_uris(uri, buy_limit) {
        try {
            await pool.query('INSERT INTO item_uris (uri, buylimit) VALUES ($1, $2) ON CONFLICT (uri) DO NOTHING', [uri, buy_limit]);
        } catch (err) {
            throw Error(`Information not added to database, error occured, ${err}`);
        }
    },

    async getAllID_item_uris() {
        try {
            return pool.query("SELECT id FROM item_uris").then(ids => {
                return ids.rows.map(item => {
                    return item.id;
                })
            })
        } catch (err) {
            throw Error(`Could not get a list of the present item_uri ids ${err}`);
        }
    },

    async consume_item_uris(id) {
        try {
            let consumedID = await pool.query('SELECT * FROM item_uris WHERE id = $1', [id]);
            await pool.query('DELETE FROM item_uris WHERE id = $1', [id]);
            return { uri: consumedID.rows[0].uri, buy_limit: consumedID.rows[0].buylimit };
        } catch (err) {
            throw Error(`Could not consume id ${err}`);
        }
    },

    async clearTable_item_uris() {
        await pool.query('TRUNCATE item_uris');
    },

    async cleanTable_item_uris(undefined) {
        await pool.query('DELETE FROM item_uris WHERE uri = $1', [undefined]);
    }
}