const express = require('express');
const routes = express.Router();

const buyLimitHandler = require('./controllers/buyLimitHandler');
const investHandler = require('./controllers/investHandler');
const stableHandler = require('./controllers/stableHandler');
const typeHandler = require('./controllers/typeHandler');
const searchHandler = require('./controllers/searchItemHandler');

routes.get('/BuyLimitListing', buyLimitHandler.showBuyLimits);
routes.get('/BuyLimitInit/:buy_limit', buyLimitHandler.initializeBuyLimit);
routes.get('/BuyLimitSearch', buyLimitHandler.createPage);

routes.get('/InvestmentInit', investHandler.initializeInvest);
routes.get('/InvestmentSearch', investHandler.createPage);

routes.get('/StableItemInit', stableHandler.initializeStable);
routes.get('/StableItemSearch', stableHandler.createPage);

routes.get('/TypeListing', typeHandler.showTypes);
routes.get('/InitByType/:type', typeHandler.initializeType);
routes.get('/SearchByTypes', typeHandler.createPage);

routes.get('/SearchText/:text', searchHandler.initializeSearch);
routes.get('/SearchByKeyword', searchHandler.createPage);

module.exports = routes;
