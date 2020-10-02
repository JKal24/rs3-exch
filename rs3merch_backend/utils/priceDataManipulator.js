const commands = require('../database/commands');
const infoParser = require('./infoParser');
const config = require('./config');
const ITEMS_PER_PAGE = 5;

module.exports = {
    async populateItems(identifier = 'BLANK') {
        try {
            const items = [];

            // Select a number of uris based on the defined limit per page.
            let ids = await commands.getAllID_item_uris(); 
            const max_length = ITEMS_PER_PAGE < ids.length ? ITEMS_PER_PAGE : ids.length;

            let populate = 0;
            let index;

            while (populate < max_length) {
                index = Math.floor(Math.random() * ids.length);

                // Info is contained in an array that has one entry which is
                // an object containing its respective uri element.
                const { uri, buy_limit } = await commands.consume_item_uris(ids[index]);
                const info = await infoParser.getItemInfo(uri, buy_limit);

                ids = config.removeArrElement(ids, index);

                const evaluator = evaluate(identifier);
                if (evaluator(info)) {
                    items.push(trimData(info));
                    populate++;
                }
            }
            return items;
        } catch (err) {
            throw Error(`Could not add items ${err}`);
        }
    }
}

function trimData(info) {

    // Reduces the data made and compiled in infoParser and dataParser
    // to be returned to the client
    delete info.cvar_three_months;
    delete info.average_three_months;
    return info;
}

function evaluate(identifier) {
    switch (identifier) {
        case 'STABLE':
            return evaluateStable;

        case 'INVEST':
            return evaluateInvest;

        case 'ORDINARY':
            return evaluateOrdinary;

        default:
            return (param) => { return param; };
    }
}

function evaluateStable(info) {
    // Passed in as an object with the entries contained in the database

    // Create some simple tests to filter out unsatisfactory items from all evaluation functions

    // Will be properly set up once more tests are done..

    if (((0.2 <= info.cvar_month <= 0.0015) && 0.025 <= info.cvar_three_months) ||
        ((0.025 <= info.cvar_three_months <= 0.003) && 0.02 <= info.cvar_month) ||
        Math.min(priceChange(info.price_one_day, info.highest_price_week), priceChange(info.price_one_day, info.lowest_price_week)) >= 0.002 ||
        Math.min(priceChange(info.price_one_day, info.highest_price_month), priceChange(info.price_one_day, info.lowest_price_month)) >= 0.004) {

        return true;
    }

    // return false;

    return true;
}

function evaluateInvest(info) {
    if ((info.average_three_months <= 1500 && info.undervaluation <= 0.95 && info.cvar_month <= 0.1 && info.cvar_three_months <= 0.15) ||
        (1500 < info.average_three_months <= 15000 && info.undervaluation <= 0.98 && info.cvar_month <= 0.07 && info.cvar_three_months <= 0.1) ||
        (15000 < info.average_three_months && info.undervaluation <= 1.0 && info.cvar_month <= 0.01 && info.cvar_three_months <= 0.03)) {

        return true;
    }

    return false;
}

function evaluateOrdinary(info) {
    const hasVariation = info.cvar_month >= 0.01;

    if (info.buy_limit <= 5000) {
        if (info.buy_limit <= 500) {
            if (info.buy_limit <= 100) {
                return (info.price_today >= 2500 || info.average_three_months >= 2200) && hasVariation;
            }
            return (info.price_today >= 850 || info.average_three_months >= 700) && hasVariation;
        }
        return (info.price_today >= 400 || info.average_three_months >= 320) && hasVariation;
    } else {
        return (info.average >= 150 && (hasVariation || info.cvar_three_months >= 0.2));
    }
}

function priceChange(newValue, oldValue) {
    return Math.round(((newValue - oldValue) / oldValue) * 100000) / 1000;
}