const pool = require("./index");

module.exports = {
    async addToTable_item_uris(uri, item_type = undefined) {
        try {
            await pool.query('INSERT INTO item_uris (uri, item_type) VALUES ($1, $2) ON CONFLICT (uri) DO NOTHING', [uri, item_type]);
        } catch (err) {
            throw Error(`Information not added to database, error occured ${err}`);
        }
    },

    async getAllID_item_uris() {
        const ids = await pool.query('SELECT id FROM item_uris');
        return ids.rows.map(item => {
            return item.id;
        })
    },

    async consume_item_uris(id) {
        return await pool.query('DELETE FROM item_uris WHERE id = $1 RETURNING uri', [id]);
    },

    async clearTable_item_uris() {
        await pool.query('TRUNCATE item_uris');
    },
}