const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');

const PORT = process.env.PORT || 8000;

const commands = require('./database/commands');

initializeTables = async () => {
    await commands.create_tables();
}
initializeTables();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
});
