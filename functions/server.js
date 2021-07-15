require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const accountKeys = require('./ServiceAccountKey.json');

app.use(cors({origin:true}));

admin.initializeApp({
    credential: admin.credential.cert(accountKeys)
});

const buyLimitHandler = require('./controllers/buyLimitHandler');
const fallingHandler = require('./controllers/fallingHandler');
const risingHandler = require('./controllers/risingHandler');
const searchHandler = require('./controllers/searchItemHandler');
const typeHandler = require('./controllers/typeHandler');
const randomHandler = require('./controllers/randomHandler');

app.get('/BuyLimitListing', buyLimitHandler.showBuyLimits);
app.get('/BuyLimitSearch/:buylimit', buyLimitHandler.createPage);

app.get('/FallingItemSearch', fallingHandler.createPage);

app.get('/RisingItemSearch', risingHandler.createPage);

app.get('/SearchByKeyword/:keyword', searchHandler.createPage);

app.get('/TypeListing', typeHandler.showTypes);
app.get('/SearchByTypes/:type', typeHandler.createPage);

app.get('/RandomListing', randomHandler.createPage);
app.get('/DefaultPageLimit', randomHandler.sendPageLimit);

exports.api = functions.https.onRequest(app);