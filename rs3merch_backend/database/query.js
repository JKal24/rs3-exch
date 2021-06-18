const QueryStream = require('pg-query-stream');

module.exports = {
    get_item_by_buy_limit(lower_limit, upper_limit) {
        return new QueryStream("SELECT * FROM items WHERE buy_limit BETWEEN $1 and $2", [lower_limit, upper_limit]);
    },

    get_item_by_types(item_type, item_sub_type) {
        return new QueryStream("SELECT * FROM items WHERE item_type = $1 AND item_sub_type = $2", [item_type, item_sub_type]);
    },

    // Declare the bounds in the controllers...

    get_item_by_rising(weeklyBound, monthlyBound) {
        return new QueryStream("SELECT * FROM items WHERE valuation_week >= $1 AND valuation_month >= $2", [weeklyBound, monthlyBound]);
    },

    get_item_by_falling(weeklyBound, monthlyBound) {
        return new QueryStream("SELECT * FROM items WHERE valuation_week <= $1 AND valuation_month <= $2", [weeklyBound, monthlyBound]);
    },

    get_item_by_search(search_keyword) {
        pattern = "%" + search_keyword + "%";
        return new QueryStream("SELECT * FROM items WHERE item_name LIKE $1", [pattern]);
    }
}