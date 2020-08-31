const ITEM_BY_TYPE_URI = 'https://runescape.wiki/w/RuneScape:Grand_Exchange_Market_Watch';
const BUY_LIMIT_URI = 'https://runescape.wiki/w/Calculator:Grand_Exchange_buying_limits';
const BUY_LIMITS_VERY_LOW = ['1', '2', '5', '10']
const BUY_LIMITS_LOW = ['50', '100', '120', '150', '175', '200', '240', '250', '300', '400', '480', '500']
const BUY_LIMITS_MED = ['1000', '1500', '2000', '5000'];
const BUY_LIMITS_HIGH = ['10000', '20000', '25000', '28000', '30000'];
const LISTING_NUM = 25;


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
    standardTypes, stableTypes, BUY_LIMIT_URI, ITEM_BY_TYPE_URI, BUY_LIMITS_VERY_LOW, BUY_LIMITS_LOW, BUY_LIMITS_MED, BUY_LIMITS_HIGH, LISTING_NUM,
    extension, normalToExchange, runescapeWikiExtension, removeUndefined, conditionalSlice, removeArrElement
};