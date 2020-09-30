module.exports = {
    compileData(table) {
        const index = table.length;
        return {
            price_today: table[index - 1],
            average: average(table.slice(index - 31)),
            average_three_months: average(table),
            undervaluation: undervaluation(table),
            cvar_month: cvar(table.slice(index - 31)),
            cvar_three_months: cvar(table),
            highest_price_week: highest(table.slice(index - 8)),
            lowest_price_week: lowest(table.slice(index - 8)),
            highest_price_month: highest(table.slice(index - 31)),
            lowest_price_month: lowest(table.slice(index - 31)),
        };
    },
}

function cvar(table) {
    const avg = average(table);

    const variance = table.reduce((acc, val) => {
        return acc + Math.pow(val - avg, 2);
    }, 0) / table.length;

    return threeDecimals(Math.sqrt(variance) / average(table));
}

function undervaluation(table) {
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