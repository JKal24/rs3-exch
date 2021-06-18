const express = require('express');
const routes = express.Router();

const buyLimitHandler = require('./controllers/buyLimitHandler');
const risingHandler = require('./controllers/risingHandler');
const fallingHandler = require('./controllers/fallingHandler');
const typeHandler = require('./controllers/typeHandler');
const searchHandler = require('./controllers/searchItemHandler');
const updateHandler = require('./controllers/updateHandler');

routes.get('/BuyLimitListing', buyLimitHandler.showBuyLimits);
routes.get('/BuyLimitInit/:buy_limit', buyLimitHandler.initializeBuyLimit);
routes.get('/BuyLimitSearch', buyLimitHandler.createPage);

routes.get('/InvestmentInit', risingHandler.initializeInvest);
routes.get('/InvestmentSearch', risingHandler.createPage);

routes.get('/StableItemInit', fallingHandler.initializeStable);
routes.get('/StableItemSearch', fallingHandler.createPage);

routes.get('/TypeListing', typeHandler.showTypes);
routes.get('/InitByType/:type', typeHandler.initializeType);
routes.get('/SearchByTypes', typeHandler.createPage);

routes.get('/SearchText/:text', searchHandler.initializeSearch);
routes.get('/SearchByKeyword', searchHandler.createPage);

routes.get('/FavoritesInit', updateHandler.showFavorites);
routes.post('/FavoritesInsert', updateHandler.addFavorite);
routes.post('/FavoritesDelete', updateHandler.removeFavorite);

module.exports = routes;
