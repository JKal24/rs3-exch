const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
require('dotenv').config();
const infoParser = require('./utils/infoParser');

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    
});

infoParser.getByType_item_uris('Archaeology');