const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const itemByBuyLimit = require('./controllers/buyLimitHandler');
const getItemInfo = require('./utils/getItemInfo');
const buyLimitHandler = require('./controllers/buyLimitHandler');
const investHandler = require('./controllers/investHandler');

const PORT = process.env.PORT || 8000;

// process.on('uncaughtException', function (err) {
//   console.error(err.stack);
//   console.log("Node NOT Exiting...");
// });

// investHandler.findInvestments();

// buyLimitHandler.populateItemsByBuyLimit("VERY_LOW");

// getItemInfo.getItemInfo('https://runescape.wiki/w/Exchange:Zuriel%27s_staff').then(val => {
//     console.log(val);
// });

// getItemInfo.getBuyLimit_ItemUri('VERY_LOW');
// getItemInfo.getBuyLimit_ItemUri('HIGH').then(val => {
//   console.log(val);
// });
