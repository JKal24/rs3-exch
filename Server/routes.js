const express = require('express');
const routes = express.Router();

const buyLimitHandler = require('./controllers/buyLimitHandler');
const fallingHandler = require('./controllers/fallingHandler');
const risingHandler = require('./controllers/risingHandler');
const searchHandler = require('./controllers/searchItemHandler');
const typeHandler = require('./controllers/typeHandler');
const randomHandler = require('./controllers/randomHandler');
const updateHandler = require('./controllers/updateHandler');

routes.get('/BuyLimitListing', buyLimitHandler.showBuyLimits);
routes.get('/BuyLimitSearch/:buylimit', buyLimitHandler.createPage);

routes.get('/FallingItemSearch', fallingHandler.createPage);

routes.get('/RisingItemSearch', risingHandler.createPage);

routes.get('/SearchByKeyword/:keyword', searchHandler.createPage);

routes.get('/TypeListing', typeHandler.showTypes);
routes.get('/SearchByTypes/:type', typeHandler.createPage);

routes.get('/RandomListing', randomHandler.createPage);

routes.get('/Update', updateHandler.updateAllItems);

module.exports = routes;
