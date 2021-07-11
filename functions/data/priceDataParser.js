module.exports = {
    doCalculations(prices) {
        const len = prices.length;
        return {
            valuation_week: valuation(prices.slice(len - 7)),
            valuation_month: valuation(prices.slice(len - 30)),
            valuation_long_term: valuation(prices),
            cvar_week: cvar(prices.slice(len - 7)),
            cvar_month: cvar(prices.slice(len - 30)),
            cvar_long_term: cvar(prices),
            highest_price_week: highest(prices.slice(len - 7)),
            lowest_price_week: lowest(prices.slice(len - 7))
        }
    }
}

function cvar(table) {
    const avg = average(table);

    const variance = table.reduce((acc, val) => {
        return acc + Math.pow(val - avg, 2);
    }, 0) / table.length;

    return threeDecimals(Math.sqrt(variance) / avg);
}

function valuation(table) {
    const value_today = table[table.length - 1];

    return threeDecimals(value_today / average(table));
}

function highest(table) {
    return table.reduce((acc, val) => {
        return (val > acc ? val : acc);
    });
}

function lowest(table) {
    return table.reduce((acc, val) => {
        return (val < acc ? val : acc);
    });
}

function average(arr) {
    return Math.round(arr.reduce((acc, val) => { return acc + val; }) / arr.length);
}

function threeDecimals(value) {
    return Math.round(value * 1000) / 1000;
}