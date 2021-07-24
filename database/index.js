const Pool = require('pg').Pool;

let pool;
pool = new Pool({
    connectionString: process.env.DATABASE_URL
});
// if (process.env.MODE == 'production') {
//     pool = new Pool({
//         connectionString: process.env.DATABASE_URL
//     });
// } else {
//     pool = new Pool({
//         user: 'postgres',
//         password: 'postgres',
//         host: 'localhost',
//         port: 5432,
//         database: 'rs3items'
//     })
// }

pool.on("error", (err, client) => {
    console.error("Error connecting to db", err);
});

module.exports = pool;