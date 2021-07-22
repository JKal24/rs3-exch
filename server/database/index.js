const Pool = require('pg').Pool;

let pool;

if (process.env.MODE == 'Production') {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        database: process.env.PGDB
    });
} else {
    pool = new Pool({
        user: 'postgres',
        password: 'postgres',
        host: 'localhost',
        port: 5432,
        database: 'rs3items'
    })
}

pool.on("error", (err, client) => {
    console.error("Error connecting to db", err);
});

module.exports = pool;