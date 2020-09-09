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

    async addToTable_items(values) {
        try {
            await pool.query('INSERT INTO items (item_name, item_image_uri, buy_limit, price_today, average, undervaluation, cvar_month, highest_price_week, lowest_price_week, highest_price_month, lowest_price_month) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
                [values.item_name, values.item_image_uri,  values.buy_limit, 
                values.price_today, values.average, values.undervaluation, 
                values.cvar_month, values.highest_price_week, values.lowest_price_week, 
                values.highest_price_month, values.lowest_price_month]);

        } catch (err) {
            throw Error(`Information not added to database, error occured ${err}`);
        }
    },

    async getAll_items() {
        return await pool.query('SELECT * FROM items');
    },

    async clearTable_item_uris() {
        await pool.query('TRUNCATE item_uris');
    },

    async clearTable_items() {
        await pool.query('TRUNCATE items');
    }
}