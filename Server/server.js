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

// Initialize the items when first run

infoParser.initializeItems();

// Update the items daily and re-initialize monthly

const dailyJob = new CronJob('0 0 * * *', async function () {
    if ((new Date()).getDate() != 1) {
        infoParser.updateItems();
    }
}, null, true, "America/Toronto");

dailyJob.start();

const monthlyJob = new CronJob('0 0 1 * *', async function () {
    infoParser.fullUpdateItems();
}, null, true, "America/Toronto");

monthlyJob.start();
