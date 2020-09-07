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
        return await pool.query('SELECT id FROM item_uris');
    },

    async consume_item_uris(id) {
        return await pool.query('DELETE FROM item_uris WHERE id = $1 RETURNING *', [id]);
    },

    async addToTable_items(values) {
        try {
            await pool.query('INSERT INTO items (item_name, price_one_day, price_three_day, price_week, price_fortnight, price_month, price_three_months, undervaluation, deviation_month, deviation_three_months, highest_price_week, lowest_price_week, highest_price_month, lowest_price_month, highest_price_three_months, lowest_price_three_months, buy_limit) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)',
                [values.item_name, values.price_one_day, values.price_three_day,
                values.price_week, values.price_fortnight, values.price_month, 
                values.price_three_months, values.undervaluation, values.deviation_month, 
                values.deviation_three_months, values.highest_price_week, values.lowest_price_week, 
                values.highest_price_month, values.lowest_price_month, values.highest_price_three_months,
                values.lowest_price_three_months, values.buy_limit]);

        } catch (err) {
            throw Error(`Information not added to database, error occured ${err}`);
        }
    },

    async getAll_items() {
        return await pool.query('SELECT * FROM items');
    },

    async count(tblName) {
        return await pool.query('SELECT COUNT(id) FROM $1', [tblName]);
    },

    async clearTable(tblName) {
        await pool.query('TRUNCATE $1', [tblName]);
    },
}