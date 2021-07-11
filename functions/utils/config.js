const https = require('https');
const cheerio = require('cheerio');

const ITEM_BY_TYPE_URI = 'https://runescape.wiki/w/RuneScape:Grand_Exchange_Market_Watch';

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

// Scrape accessing functions

async function getCheerioPage(uri) {
    const data = await parseHTTPS(uri);
    return cheerio.load(data);
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

function baseToMarketExchange(uri) {
    return '/w/RuneScape:Grand_Exchange_Market_Watch/' + uri;
}

function apiItemGraph(id) {
    return 'https://secure.runescape.com/m=itemdb_rs/api/graph/' + id + '.json';
}

function standardTypeColumn(uri) {
    return (uri ? uri.match(/\w+$/)[0] : null);
}

function parseInteger(str) {
    return parseInt(str.replace(/,/g, ''));
}

// Only allows words, may have spaces

function capitalizeFirstLetter(string) {
    const adjustedString = string.match(/[A-Za-z| ]*/g)[0]
    return adjustedString.charAt(0).toUpperCase() + adjustedString.slice(1);
}

// Type information listings

const buyLimits = {
    Very_Low: ['1', '2', '5', '10'],
    Low: ['50', '100', '120', '150', '175', '200', '240', '250', '300', '400', '480', '500'],
    Medium: ['1000', '1500', '2000', '5000'],
    High: ['10000', '20000', '25000', '28000', '30000']
}

// Custom fields

const standardTypes = [
    'Archaeology',
    'Construction',
    'Crafting',
    'Farming',
    'Summoning',
    'Secondary_resources',
    'Wood',
    'Food',
    'Potions',
    'Hunter',
    'Metals',
    'Magic_gear',
    'Melee_armour',
    'Melee_weapons',
    'Ranged_gear',
    'Tools',
    'Divination',
    'Bones',
    'Rares',
    'Treasure_Trails'
]

const BATCH_READ = 100;

module.exports = {
    buyLimits, standardTypes, ITEM_BY_TYPE_URI, parseHTTPS, parseInteger, BATCH_READ, getCheerioPage, capitalizeFirstLetter,
    normalToExchange, exchangeToModuleData, moduleToBaseName, baseToMarketExchange, standardTypeColumn, runescapeWikiBaseLink, apiItemGraph
};