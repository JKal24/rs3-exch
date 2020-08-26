const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()
const app = express();
const itemByBuyLimit = require('./controllers/buyLimitHandler');
const getItemInfo = require('./utils/getItemInfo');

const PORT = process.env.PORT || 8000;

itemByBuyLimit.populateItemsByBuyLimit("VERY_LOW");