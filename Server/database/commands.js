const pool = require("./index");

module.exports = {

    /**
     * Array parameter must be formatted according to the columns in the sql table.
     */

    async add_item(arr) {
        await pool.query('INSERT INTO items (item_id, prices, valuation_week, valuation_month, valuation_long_term, cvar_week, cvar_month, cvar_long_term, highest_price_week, lowest_price_week, item_name, item_image_uri, buy_limit, item_type, item_sub_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) ON CONFLICT (item_id) DO NOTHING', arr);
    },

    async get_item_ids() {
        return pool.query("SELECT item_id FROM items").then(ids => {
            return ids.rows.map(id => {
                return id.item_id;
            })
        })
    },

    async get_item_by_id(item_id) {
        return (await pool.query("SELECT * FROM items WHERE item_id = $1", [item_id])).rows;
    },

    async update_item(price_data, item_id) {
        price_data.push(item_id);
        await pool.query("UPDATE items SET prices = $1, valuation_week = $2, valuation_month = $3, valuation_long_term = $4, cvar_week = $5, cvar_month = $6, cvar_long_term = $7, highest_price_week = $8, lowest_price_week = $9 WHERE item_id = $10", price_data);
    },

    async get_random_items(ITEMS_PER_PAGE) {
        return (await pool.query("SELECT * FROM items TABLESAMPLE SYSTEM(0.01) LIMIT $1", [ITEMS_PER_PAGE])).rows;
    },

    async empty_items(mode) {
        if (mode == "Production") {
            await pool.query("DELETE FROM items");
        }
    },

    async get_update() {
        return (await pool.query("SELECT * FROM update_date")).rows[0];
    },

    async add_update(runedate) {
        return await pool.query("INSERT INTO update_date (runedate) VALUES ($1)", [runedate]);
    },

    async clean_update() {
        await pool.query("DELETE FROM update_date");
    }
}