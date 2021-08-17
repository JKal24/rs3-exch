require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const path = require('path');

app.use(cors());
app.use(express.json());

app.use(routes);

if (process.env.MODE === "production") {
    app.use(express.static(path.join(__dirname, 'client/build')));
} 
else 
{
    app.use(express.static(path.join(__dirname, 'client/public')));
}

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '/client' , 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
});