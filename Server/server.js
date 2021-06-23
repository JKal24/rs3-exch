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

const infoParser = require('./data/infoParser');
const { CronJob } = require('cron');

const dailyJob = new CronJob('0 0 * * *',() => {
    if ((new Date()).getDate() != 1) {
        infoParser.updateItems();
    }
}, null, false, "America/Toronto"); 

const monthlyJob = new CronJob('0 0 1 * *',() => {
    console.log('running');
    infoParser.initializeItems();
}, null, true, "America/Toronto"); 
