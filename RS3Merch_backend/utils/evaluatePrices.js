const config = require('./config');
const getInfo = require('./getItemInfo');

module.exports = {
    async getValuationInfo(uri) {
        const data = config.parseHTTPS(uri);
        let table = getInfo.getValuationTable(data);
        // Use the three functions below to get the information to put into the db
        // Will be used by getItemInfo
    }
}

/** 
 * These functions will help to show how the item is performing,
 * in the future, a graph will be plotted and it will show
 * roughly 3 months worth of data.
*/

async function standardDeviation(table) {
    const avg = average(table); 

    const variance = table.reduce(acc, val => {
        acc + Math.pow(val - avg);
    }, 0) / table.length;

    return Math.round(Math.sqrt(variance) * 1000) / 1000;
}

async function getTrajectoryTimeline(table) {
const value_today = table[table.length - 1];
const value_week = table[table.length - 8];
const value_month = table[table.length - 31];
const value_three_months = table[table.length - 91];

// Return with sql var names
}

async function evaluateWorth(table) {

}

function average(arr) {
    return (arr.reduce(acc, val => {return acc + val}) / arr.length);
}