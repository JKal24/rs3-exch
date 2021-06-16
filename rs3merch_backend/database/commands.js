const pool = require("./index");

module.exports = {

    /**
     * Array parameter must be formatted according to the columns in the sql table.
     */

    async add_items(arr) {
        await pool.query('INSERT INTO items (item_id, prices, undervaluation, cvar_month, cvar_week, highest_price_week, lowest_price_week, item_name, item_image_uri, buy_limit, item_type, item_sub_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) ON CONFLICT (item_id) DO NOTHING', arr);
    },

    async get_item(item_name) {
        await pool.query("SELECT * FROM items WHERE $")
    },

    async add_item_ids(id) {
        try {
            await pool.query('INSERT INTO item_ids (item_id) VALUES ($1) ON CONFLICT (item_id) DO NOTHING', [id]);
        } catch (err) {
            throw Error(`Item ID not added to database, check to see if database is hooked up properly ${err} \n`);
        }
    },

    async addToTable_item_uris(uri, buy_limit) {
        try {
            await pool.query('INSERT INTO item_uris (uri, buylimit) VALUES ($1, $2) ON CONFLICT (uri) DO NOTHING', [uri, buy_limit]);
        } catch (err) {
            throw Error(`Uri not added to database, error occured, check to see if database is hooked up properly ${err} \n`);
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
            throw Error(`Could not get a list of the present item_uri ids, check to see if database is hooked up properly ${err} \n`);
        }
    },

    async consume_item_uris(id) {
        try {
            let consumedID = await pool.query('SELECT * FROM item_uris WHERE id = $1', [id]);
            await pool.query('DELETE FROM item_uris WHERE id = $1', [id]);
            return { uri: consumedID.rows[0].uri, buy_limit: consumedID.rows[0].buylimit };
        } catch (err) {
            throw Error(`Could not consume id, too many requests ${err} \n`);
        }
    },

    async clearTable_item_uris() {
        try {
            await pool.query('TRUNCATE item_uris');
        } catch (err) {
            throw Error(`Could not clear table, check to see if database is hooked up properly ${err} \n`);
        }
    },

    async cleanTable_item_uris(undefined) {
        try {
            await pool.query('DELETE FROM item_uris WHERE uri = $1', [undefined]);
        } catch (err) {
            throw Error(`Could not clean table, check to see if database is hooked up properly ${err} \n`);
        }
    },

    async getFavorites() {
        try {
            return (await pool.query('SELECT * FROM favorite_items')).rows;
        } catch (err) {
            throw Error(`Could not get favorite items, check to see if database is hooked up properly ${err} \n`);
        }
    },

    async addFavorites(item) {
        try {
            await pool.query('INSERT INTO favorite_items (item_name, item_id, item_image_uri, buy_limit, price_today, average, undervaluation, cvar_month, highest_price_week, lowest_price_week, highest_price_month, lowest_price_month) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) ON CONFLICT (item_name) DO NOTHING',
            [item.item_name, item.item_id, item.item_image_uri, item.buy_limit, item.price_today, item.average, item.undervaluation, item.cvar_month, item.highest_price_week, item.lowest_price_week, item.highest_price_month, item.lowest_price_month]);
        } catch (err) {
            throw Error(`Could not get favorite items, check to see if database is hooked up properly ${err} \n`);
        }
    },

    async removeFavorites(item_name) {
        try {
            await pool.query('DELETE FROM favorite_items WHERE item_name = $1', [item_name]);
        } catch (err) {
            throw Error(`Could not get favorite items, check to see if database is hooked up properly ${err} \n`);
        }
    }
}