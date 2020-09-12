const express = require('express');
const routes = express.Router();

const buyLimitHandler = require('./controllers/buyLimitHandler');
const investHandler = require('./controllers/investHandler');
const stableHandler = require('./controllers/stableHandler');
const typeHandler = require('./controllers/typeHandler');
const searchHandler = require('./controllers/searchItemHandler');

routes.get('/BuyLimitSearch', buyLimitHandler.initializeBuyLimit);
routes.get('/BuyLimitSearch/:page', buyLimitHandler.createPage);

routes.get('/InvestmentSearch', investHandler.initializeInvest);
routes.get('/InvestmentSearch/:page', investHandler.createPage);

routes.get('/StableItemSearch', stableHandler.initializeStable);
routes.get('/StableItemSearch/:page', stableHandler.createPage);

routes.get('/SearchByType', typeHandler.initializeType);
routes.get('/SearchByTypes/:page', typeHandler.createPage);

routes.get('/SearchByKeyword', searchHandler.initializeSearch);
routes.get('/SearcByKeyword/:page', searchHandler.createPage);

module.exports = routes;
