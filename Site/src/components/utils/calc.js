export const valuation = (amount) => {
    return round(percentage(complement(amount)));
}

export const variation = (amount) => {
    return round(percentage(amount));
}

function round(amount) {
    return Math.round((amount + Number.EPSILON) * 100) / 100
}

function complement(amount) {
    return (1.0 - amount);
}

function percentage(amount) {
    return 100 * amount;
}