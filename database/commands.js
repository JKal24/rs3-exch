const pool = require("./index");

module.exports = {
    /**
     * Array parameter must be formatted according to the columns in the sql table.
     */

    async add_item(arr) {
        const queryString = 'INSERT INTO items (item_id, prices, valuation_week, valuation_month, valuation_long_term, cvar_week, cvar_month, cvar_long_term, ' +
            'highest_price_week, lowest_price_week, item_name, item_image_uri, buy_limit, item_type, item_sub_type)' +
            ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)' +
            ' ON CONFLICT (item_id) DO UPDATE SET item_type = ARRAY(SELECT DISTINCT UNNEST(items.item_type || $14)),' + 
            ' item_sub_type = ARRAY(SELECT DISTINCT UNNEST(items.item_sub_type || $15))' +
            ' WHERE NOT items.item_type @> $14 AND NOT items.item_sub_type @> $15';
        await pool.query(queryString, arr);
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

    /**
     * @param {The number of items being requested} ITEMS_PER_PAGE 
     * @returns An array with a minimum of items requested, may be more due to inconsistent nature of tablesample.
     */

    async get_random_items(ITEMS_PER_PAGE) {
        const update = await module.exports.get_update();
        const count = update ? update.item_count : await module.exports.get_current_items_count();
        const percentage = count == 0 ? ITEMS_PER_PAGE : Math.ceil((ITEMS_PER_PAGE / count) * 100);
        let attempt = 0;
        let data;

        do {
            data = (await pool.query("SELECT * FROM items TABLESAMPLE BERNOULLI($1)", [percentage])).rows;
            if (attempt > 10) break;
            attempt++;
        }
        while (data.length < ITEMS_PER_PAGE);

        return data;
    },

    async get_current_items_count() {
        return (await pool.query("SELECT COUNT(*) FROM items")).rows[0].count;
    },

    async empty_items() {
        if (process.env.mode != "Production") {
            await pool.query("DELETE FROM items");
        }
    },

    async delete_item(item_id) {
        if (process.env.mode != "Production") {
            await pool.query("DELETE FROM items WHERE items.item_id = $1", [item_id]);
        }
    },

    async get_update() {
        const update = await pool.query("SELECT * FROM update_date");
        return update.rows[0];
    },

    async add_update(runedate, item_count, complete=false) {
        return await pool.query("INSERT INTO update_date (runedate, item_count, complete) VALUES ($1, $2, $3) ON CONFLICT(runedate) DO UPDATE SET item_count = $2, complete = $3", [runedate, item_count, complete]);
    },

    // Clean and replace with updated date and count, previous counts do not need to be kept

    async clean_update() {
        await pool.query("DELETE FROM update_date");
    }
}