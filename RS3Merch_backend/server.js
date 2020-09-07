const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const routes = require('./routes');
const buyLimitHandler = require('./controllers/buyLimitHandler');
const investHandler = require('./controllers/investHandler');
const infoParser = require('./utils/infoParser');
const config = require('./utils/config');

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log('listening');   
});

// process.on('uncaughtException', function (err) {
//   console.error(err.stack);
//   console.log("Node NOT Exiting...");
// });