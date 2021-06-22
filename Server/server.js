require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
});

const cron = require('node-cron');
const infoParser = require('./data/infoParser');

cron.schedule('0 0 * * *', () => {
    if ((new Date()).getDate() != 1) {
        infoParser.updateItems();
    }
});

cron.schedule('0 0 1 * *', () => {
    infoParser.initializeItems();
});