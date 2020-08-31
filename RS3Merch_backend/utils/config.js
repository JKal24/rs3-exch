const pool = require('../database');
const https = require('https');

const ITEM_BY_TYPE_URI = 'https://runescape.wiki/w/RuneScape:Grand_Exchange_Market_Watch';
const BUY_LIMIT_URI = 'https://runescape.wiki/w/Calculator:Grand_Exchange_buying_limits';
const BUY_LIMITS_VERY_LOW = ['1', '2', '5', '10']
const BUY_LIMITS_LOW = ['50', '100', '120', '150', '175', '200', '240', '250', '300', '400', '480', '500']
const BUY_LIMITS_MED = ['1000', '1500', '2000', '5000'];
const BUY_LIMITS_HIGH = ['10000', '20000', '25000', '28000', '30000'];
const LISTING_NUM = 25;

/** 
 * Make a function that can calculate undervaluation,
 * Undervalue = value today/worth
 * Worth = average value over 3 months
 */

// Function that scrapes HTML data from a HTTPS page and returns it

function parseHTTPS(uri) {
    return new Promise((resolve, reject) => {
        https.get(uri, res => {
            let data = '';
            res.on("data", chunk => {
                data += chunk;
            })

            res.on("close", () => {
                return resolve(data);
            })

            res.on("error", err => {
                console.log(`Error occured when accessing this HTTPS page ${err}`);
            })
        });
    });
}

// Transformation functions


function extension(str) {
    return str.replace(/\s/g, '_').replace(/&/g, '%26').replace(/'/, '%27');
}

function runescapeWikiExtension(str) {
    return 'https://runescape.wiki' + str;
}

function normalToExchange(uri) {
    return uri.replace('/w/', '/w/Exchange:');
}

function conditionalSlice(arr) {
    if (arr.length > 91) {
        return arr.slice(arr.length - 91, arr.length);
    }
    return arr;
}

function removeArrElement(arr, index) {
    return arr.slice(0, index).concat(arr.slice(index + 1));
}

// DB Functions

async function addToDatabase(values) {
    await pool.query('INSERT INTO items (item_name, price_one_day, price_three_day, price_week, price_month, price_three_months, buy_limit, item_type, deviation_month, deviation_three_months) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)'
        , [values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[8], values[9]], (err, result) => {
            if (err) {
                return console.log(`Ran into an error when inputting data into the database ${err}`);
            }
            console.log(`Information added to database`);
        }
    );
}

async function removeFromDatabase(values) {

}

// Information type listings


const stableTypes = {

}

const standardTypes = {
    base: {
        standard: ["Herblore", "Farming", "Crafting", "Fletching", "Melee_armor", "Melee_weapons"]
    },

    // Custom type fields

    summoningPouches: {
        Summoning: [],
        Archaeology: ["Binding contracts"]
    },
    secondaryResources: {
        Summoning: ["Tertiary components"],

    },
    gatherable: {
        Woodcutting: ["Logs"]
    },
    food: {

    },
    weapons: {

    },
    metals: {

    },
    combatSupport: {
        Melee_armor: ["Capes", "Amulets", "Rings",],
        Magic: [""]
    },
    fortunates: {

    },
    tools: {

    },
    energyResources: {

    },
    bones: {

    },
    rares: {

    }
}

module.exports = {
    BUY_LIMIT_URI, ITEM_BY_TYPE_URI, BUY_LIMITS_VERY_LOW, BUY_LIMITS_LOW, BUY_LIMITS_MED, BUY_LIMITS_HIGH, LISTING_NUM,
    extension, normalToExchange, runescapeWikiExtension, conditionalSlice, removeArrElement,
    parseHTTPS, addToDatabase, removeFromDatabase,
    standardTypes, stableTypes
};