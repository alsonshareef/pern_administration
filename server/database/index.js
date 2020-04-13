const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'secret',
  host: 'localhost',
  database: 'docker_pern_admin',
  port: 5432,
});

module.exports = pool;
