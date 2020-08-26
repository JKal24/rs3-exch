const pg = require('pg');
const pool = new pg.Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: process.env.PGDB,
    port: process.env.PGPORT
});

module.exports = {
    query: async (text, params, callback) => {
        return pool.query(text, params, callback);
    }
}