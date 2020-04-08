const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'alsonshareef',
  password: 'password',
  host: 'localhost',
  database: 'pern_admin',
  port: 5432,
});

module.exports = pool;
