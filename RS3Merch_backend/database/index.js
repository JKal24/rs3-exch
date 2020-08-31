const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "brave99",
    host: "localhost",
    port: 5432,
    database: "rs3items"
});

pool.on("error", (err, client) => {
    console.log("Error connecting to db", err);
});

module.exports = pool;