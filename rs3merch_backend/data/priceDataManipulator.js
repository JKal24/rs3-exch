const commands = require('../database/commands');
const infoParser = require('./infoParser');
const config = require('../utils/config');
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

                // Info is contained in an array inside an object which
                // contains its' respective elements
                const { uri, buy_limit } = await commands.consume_item_uris(ids[index]);
                const info = await infoParser.getItemInfo(uri, buy_limit);

                ids = config.removeArrElement(ids, index);

                const evaluator = evaluate(identifier);
                if (evaluator(info)) {
                    items.push(info);
                    populate++;
                }
            }
            return items;
        } catch (err) {
            throw Error(`Could not add items ${err} \n`);
        }
    }
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

    return ((info.cvar_month != 0 || 
    Math.min(priceChange(info.price_one_day, info.highest_price_month), priceChange(info.price_one_day, info.lowest_price_month)) >= 0.004) && info.average >= 175 ? true : false);
}

function evaluateInvest(info) {
    return (info.average >= 175 && info.undervaluation <= 1.1 && info.cvar_month != 0 ? true : false);
}

function evaluateOrdinary(info) {
    return ((info.average >= 250 && info.cvar_month != 0) ? true : false);
}

function priceChange(newValue, oldValue) {
    return Math.round(((newValue - oldValue) / oldValue) * 100000) / 1000;
}