const express = require('express');
const routes = express.Router();

const buyLimitHandler = require('./controllers/buyLimitHandler');
const investHandler = require('./controllers/investHandler');
const stableHandler = require('./controllers/stableHandler');
const typeHandler = require('./controllers/typeHandler');

routes.get('/BuyLimitSearch', buyLimitHandler.initializeBuyLimit);
routes.get('/BuyLimitSearch/:page', buyLimitHandler.nextPage);

routes.get('/InvestmentSearch', investHandler.initializeInvest);
routes.get('/InvestmentSearch/:page', investHandler.nextPage);

routes.get('/StableItemSearch', stableHandler.initializeStable);
routes.get('/StableItemSearch/:page', stableHandler.nextPage);

routes.get('/SearchByType', typeHandler.initializeType);
routes.get('/SearchByTypes/:page', typeHandler.nextPage);

module.exports = routes;
