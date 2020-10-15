const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'alsonshareef',
  password: 'password',
  host: 'localhost',
  port: 5432,
  database: 'pern_admin',
});

module.exports = pool;
