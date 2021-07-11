const { admin, db } = require('./admin');
const pool = require('./index');

let idCount = 0;

module.exports = {

    async add_item(items) {
        const item = db.collection('items').doc(items.item_id);

        const checkItem = await item.get();
        if (!checkItem.exists) {
            Object.assign(items, { random_id: idCount++ });
            await db.collection('items').doc(items.item_id).set(items);
        } else {

            await item.update({
                item_type: admin.firestore.FieldValue.arrayUnion(items.item_type[0]),
                item_sub_type: admin.firestore.FieldValue.arrayUnion(items.item_sub_type[0])
            })
        }
    },

    async update_item_type(item_id, item_type) {
        const item = db.collection('items').doc(item_id);
        await item.update({
            item_type: admin.firestore.FieldValue.arrayUnion(item_type)
        })
    },

    async update_item_sub_type(item_id, item_sub_type) {
        const item = db.collection('items').doc(item_id);
        await item.update({
            item_sub_type: admin.firestore.FieldValue.arrayUnion(item_sub_type)
        })
    },

    /**
     * @param {Is the registered item ID which corresponds to an item in game} item_id 
     * @param {Is the data from the price data parser which contains weekly, monthly and long-term valuation and variation 
     * as well as weekly highs and lows} priceData 
     */
    async update_item_price_data(item_id,
        { prices, valuation_week, valuation_month, valuation_long_term, cvar_week, cvar_month, cvar_long_term, highest_price_week, lowest_price_week }) {
        const item = db.collection('items').doc(item_id);
        await item.update({
            prices: prices,
            valuation_week: valuation_week,
            valuation_month: valuation_month,
            valuation_long_term: valuation_long_term,
            cvar_week: cvar_week,
            cvar_month: cvar_month,
            cvar_long_term: cvar_long_term,
            highest_price_week: highest_price_week,
            lowest_price_week: lowest_price_week
        })
    },

    async get_item_ids() {
        const items = db.collection('items');

        return items.listDocuments().then(documentRefs => {
            return db.getAll(...documentRefs);
        }).then(documentSnapshots => {
            return documentSnapshots.map(snapshot => {
                return snapshot.get('item_id');
            })
        });
    },

    async delete_item(item_id) {
        if (process.env.mode == "Production") {
            const doc = db.collection('items').doc(item_id);
            await doc.delete();
        }
    },

    async get_item_by_id(item_id) {
        return db.collection('items').doc(item_id);
    },

    /**
     * Assumes that the number of items is greater than 4 times the page size
     * 
     * @param {The number of items being requested} ITEMS_PER_PAGE 
     * @returns An array with a minimum of items requested
     */

    async get_random_items(ITEMS_PER_PAGE) {
        ITEMS_PER_PAGE *= 2;
        let items = db.collection('items');
        const random = getRandomInt(idCount - ITEMS_PER_PAGE) + ITEMS_PER_PAGE;
        let conditional;

        if (Math.random() > 0.5) {
            conditional = '<';
        } else {
            conditional = '>';
        }

        let itemsSnapshot = await items.where('random_id', '<', random).limit(5).get();
        const items = itemsSnapshot.docs;
        let size = itemsSnapshot.size;

        while (size < ITEMS_PER_PAGE) {
            itemsSnapshot = await items.where('random_id', '<', random).limit(5).get();
            items = items.concat(itemsSnapshot.docs);
            size += itemsSnapshot.size;
        }

        return items;
    },

    get_item_by_buy_limit(lower_limit, upper_limit) {
        const items = db.collection('items');
        return (await items.where('buy_limit', ">=", lower_limit)
            .where('buy_limit', "<=", upper_limit)
            .get()).docs;
    },

    /**
     * @param {Is the item type that is being requested, single type searches will assume that the type is not in an array} item_type 
     * @returns all entries containing that same type
     */

    get_item_by_types(item_type) {
        const items = db.collection('items');
        return (await items.where('item_type', "==", item_type)
            .get()).docs;
    },

    get_item_by_types_and_sub_type(item_type, item_sub_type) {
        const items = db.collection('items');
        return (await items.where('item_type', "==", item_type)
            .where('item_sub_type', "==", item_sub_type)
            .get()).docs;
    },

    /**
     * @param {Requirement that must be higher or lower than the applicable values in the table} weeklyBound, monthlyBound 
     * @returns entries which satisfy the above requirements
     */

    get_item_by_rising(weeklyBound, monthlyBound) {
        const items = db.collection('items');
        return (await items.where('valuation_week', ">=", weeklyBound)
            .where('valuation_month', ">=", monthlyBound)
            .where('cvar_long_term', '>', 0).get()).docs;
    },

    get_item_by_falling(weeklyBound, monthlyBound) {
        const items = db.collection('items');
        return (await items.where('valuation_week', "<=", weeklyBound)
            .where('valuation_month', "<=", monthlyBound)
            .where('cvar_long_term', '>', 0).get()).docs;
    },

    get_item_by_search(search_keyword) {
        const queryText = search_keyword.toLowerCase();
        const items = db.collection('items');

        return (await items.orderBy('item_name')
            .startAt(queryText)
            .endAt(queryText + "\uf8ff")
            .get()).docs;
    },

    async get_update() {
        return (await pool.query("SELECT * FROM update_date")).rows[0];
    },

    async add_update(runedate, item_count) {
        return await pool.query("INSERT INTO update_date (runedate, item_count) VALUES ($1, $2)", [runedate, item_count]);
    },

    // Clean and replace with updated date and count, previous counts do not need to be kept

    async clean_update() {
        await pool.query("DELETE FROM update_date");
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}