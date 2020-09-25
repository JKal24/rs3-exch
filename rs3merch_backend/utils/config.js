const https = require('https');

const BUY_LIMIT_URI = 'https://runescape.wiki/w/Calculator:Grand_Exchange_buying_limits';
const ITEM_BY_TYPE_URI = 'https://runescape.wiki/w/RuneScape:Grand_Exchange_Market_Watch';
const DETAIL_URI = 'https://secure.runescape.com/m=itemdb_rs/api/catalogue/detail.json?item=';
const GRAPH_URI = 'https://secure.runescape.com/m=itemdb_rs/api/graph/';


// Function that scrapes HTML data from a HTTPS page and returns it

function parseHTTPS(uri) {
    return new Promise((resolve, reject) => {
        https.get(uri, res => {
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            })

            res.on('close', () => {
                return resolve(data);
            })

            res.on('error', err => {
                return reject(`Error occured when accessing this HTTPS page ${err}`);
            })
        });
    });
}

// Transformation functions


function extension(str) {
    return str.replace(/\s/g, '_').replace(/&/g, '%26').replace(/'/g, '%27').replace(/\+/g, '%2B');
}

function runescapeWikiBaseLink(str) {
    return 'https://runescape.wiki' + str;
}

function normalToExchange(uri) {
    return uri.replace('/w/', '/w/Exchange:');
}

function exchangeToModuleData(uri) {
    return uri.replace('Exchange:', 'Module:Exchange/') + '/Data';
}

function moduleToBaseName(name) {
    return name.replace(/Module:Exchange\//, '').replace(/\/Data/, '');
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

// Type information listings

const buyLimits = {
    BUY_LIMITS_VERY_LOW: ['1', '2', '5', '10'],
    BUY_LIMITS_LOW: ['50', '100', '120', '150', '175', '200', '240', '250', '300', '400', '480', '500'],
    BUY_LIMITS_MED: ['1000', '1500', '2000', '5000'],
    BUY_LIMITS_HIGH: ['10000', '20000', '25000', '28000', '30000']
}

const standardTypes = {
    // Custom fields
    Archaeology: {
        Archaeology: ['Soil', 'Materials',]
    },
    Construction: {
        Construction: ['Building materials', 'Nails', 'Aquarium supplies', 'Garden']
    },
    Crafting: {
        Crafting: ['Materials', 'Uncut gems', 'Cut gems', 'Rings', 'Necklaces', 'Unstrung amulets', 'Amulets', 'Bracelets', 'Silver items', 'Hides', 'Leather', 'Glass items', 'Battlestaves',
        'Urns'],
        Fletching: ['Bolts tips', 'Gem-tipped bolts']
    },
    Farming: {
        Farming: ['Allotment seeds', 'Flower seeds', 'Herb seeds', 'Hops seeds', 'Bush seeds', 'Fruit tree seeds', 'Tree seeds', 'Cacti seeds', 'Mushroom spores', 'Flowers', 
        'Hops', 'Bushes', 'Fruits', 'Cacti and mushrooms', 'Unchecked', 'Produce'],
        Herblore: ['Clean herbs', 'Grimy herbs']
    },
    Summoning: {
        Summoning: ['Pouches', 'Scrolls'],
        Archaeology: ['Binding contracts', 'Scrolls']
    },
    Secondary_resources: {
        Summoning: ['Tertiary components'],
        Herblore: ['Secondary ingredients']
    },
    Wood: {
        Woodcutting: ['Logs'],
        Firemaking: ['Pyre Logs', 'Incense sticks'],
        Fletching: ['Unstrung bows', 'Strung bows', 'Finished arrows', 'Crossbow limbs', 'Unstrung crossbows', 'Strung 1h crossbows', 'Strung 2h crossbows', 
        'Unfinished bolts', 'Finished bolts']
    },
    Food: {
        Cooking: ['Raw meat', 'Cooked meat', 'Raw fish', 'Cooked fish', 'Sushi', 'Snails', 'Big Game Hunter', 'Stews and soups', 'Pies', 'Potatoes', 'Drinks', 'Mature drinks'],
        Herblore: ['Making Primal Extract']
    },
    Potions: {
        Herblore: ['Unfinished standard potions', 'Standard potions', 'Combination potions', 'Unfinished juju potions', 'Juju potions', 'Bombs']
    },
    Hunter: {
        Hunter: ['Meat', 'Big Game Hunter', 'Catches', 'Impling jars', 'Other drops']
    },
    Metals: {
        Mining: ['Ores', 'Stone spirits', 'Other mineable items', 'Ore boxes'],
        Smithing: ['Bars']
    },
    Magic_gear: {
        Magic: ['ALL']
    },
    Melee_armour: {
        Melee_armour: ['ALL'],
    },
    Melee_weapons: {
        Melee_weapons: ['ALL']
    },
    Ranged_gear: {
        Ranged: ['ALL']
    },
    Tools: {
        Archaeology: ['Mattocks'],
        Smithing: ['Pickaxes'],
        Woodcutting: ['Hatchets']
    },
    Divination: {
        Divination: ['Energies', 'Portents', 'Signs']
    },
    Bones: {
        Prayer: ['Bones and ashes']
    },
    Rares: {
        Archaeology: ['Artefacts', 'Ancient Invention'],
        Fletching: ['Scrimshaws'],
        Slayer: ['Unique drops', 'Boots', 'Order of Ascension', 'Armour and weapons'],
        Smithing: ['Godswords', 'Dragon platebody', 'Malevolent armour'],
        Runecrafting: ['Tectonic armour'],
        Combat_minigames: ['Titles'],
        Miscellaneous: ['Item shards', 'Keys']
    },
    Treasure_Trails: {
        Treasure_Trails: ['ALL']
    }
}

module.exports = {
    buyLimits, standardTypes, BUY_LIMIT_URI, ITEM_BY_TYPE_URI, DETAIL_URI, GRAPH_URI, parseHTTPS,
    extension, normalToExchange, exchangeToModuleData, moduleToBaseName, runescapeWikiBaseLink, conditionalSlice, removeArrElement
};