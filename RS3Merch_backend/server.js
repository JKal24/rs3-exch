const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const routes = require('./routes');
const buyLimitHandler = require('./controllers/buyLimitHandler');

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log('listening');   
});

buyLimitHandler.initializeBuyLimit('LOW').then(val => {
    console.log(val);
})