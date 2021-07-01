const QueryStream = require('pg-query-stream');

module.exports = {
    get_item_by_buy_limit(lower_limit, upper_limit) {
        return new QueryStream("SELECT * FROM items WHERE buy_limit BETWEEN $1 and $2", [lower_limit, upper_limit]);
    },

    /**
     * @param {Is the item type that is being requested, single type searches will assume that the type is not in an array} item_type 
     * @returns all entries containing that same type
     */

    get_item_by_types(item_type) {
        return new QueryStream("SELECT * FROM items WHERE item_type @> $1", [[item_type]]);
    },

    get_item_by_types_and_sub_type(item_type, item_sub_type) {
        return new QueryStream("SELECT * FROM items WHERE item_type @> $1 AND item_sub_type @> $2", [[item_type], [item_sub_type]]);
    },

    /**
     * @param {Requirement that must be higher or lower than the applicable values in the table} weeklyBound, monthlyBound 
     * @returns entries which satisfy the above requirements
     */

    get_item_by_rising(weeklyBound, monthlyBound) {
        return new QueryStream("SELECT * FROM items WHERE valuation_week >= $1 AND valuation_month >= $2 AND cvar_month > 0", [weeklyBound, monthlyBound]);
    },

    get_item_by_falling(weeklyBound, monthlyBound) {
        return new QueryStream("SELECT * FROM items WHERE valuation_week <= $1 AND valuation_month <= $2 AND cvar_month > 0", [weeklyBound, monthlyBound]);
    },

    get_item_by_search(search_keyword) {
        pattern = "%" + search_keyword + "%";
        return new QueryStream("SELECT * FROM items WHERE item_name LIKE $1", [pattern]);
    }
}