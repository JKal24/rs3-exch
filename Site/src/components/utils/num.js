export const valuation = (amount) => {
    return round(percentage(base(amount))) + "%";
}

export const variation = (amount) => {
    return round(percentage(amount)) + "%";
}

function round(amount) {
    return Math.round((amount + Number.EPSILON) * 100) / 100
}

function base(amount) {
    return (amount - 1.0);
}

function percentage(amount) {
    return 100 * amount;
}