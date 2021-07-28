const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const path = require('path');
const cors = require('cors')
app.use(cors())

const routes = require('./routes');
app.use(routes);

app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html')); 
    });
}

app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
});
