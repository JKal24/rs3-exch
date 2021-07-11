require('dotenv').config();
const express = require('express');
const app = express();
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const buyLimitHandler = require('./controllers/buyLimitHandler');
const fallingHandler = require('./controllers/fallingHandler');
const risingHandler = require('./controllers/risingHandler');
const searchHandler = require('./controllers/searchItemHandler');
const typeHandler = require('./controllers/typeHandler');
const randomHandler = require('./controllers/randomHandler');
const updateHandler = require('./controllers/updateHandler');

app.get('/BuyLimitListing', buyLimitHandler.showBuyLimits);
app.get('/BuyLimitSearch/:buylimit', buyLimitHandler.createPage);

app.get('/FallingItemSearch', fallingHandler.createPage);

app.get('/RisingItemSearch', risingHandler.createPage);

app.get('/SearchByKeyword/:keyword', searchHandler.createPage);

app.get('/TypeListing', typeHandler.showTypes);
app.get('/SearchByTypes/:type', typeHandler.createPage);

app.get('/RandomListing', randomHandler.createPage);
app.get('/DefaultPageLimit', randomHandler.sendPageLimit);

app.get('/Update', updateHandler.updateAllItems);

exports.api = functions
