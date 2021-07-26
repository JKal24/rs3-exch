const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const path = require('path');

app.use(cors());
app.use(express.json());

if (process.env.MODE == 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
}

app.use(routes);

app.get('/*', (req, res) => {
    let url = path.join(__dirname, '../client/build', 'index.html');
    if (!url.startsWith('/app/')) // we're on local windows
        url = url.substring(1);
    res.sendFile(url);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
});
