const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "",
    host: "localhost",
    port: 5432,
    database: "perntodo"
});

module.exports = pool;

// Commands for starting and entering the Postgres

// 1. psql -U postgres
// \l : list all databases
// \c db_name : move into a db
// \dt : show a table in database