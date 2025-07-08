
const { Pool } = require('pg');

const pool = new Pool({
  user        : 'postgres',
  host        : 'shortline.proxy.rlwy.net',
  database    : 'railway',
  password    : 'llYfYGSjwRjXlvNWMVHJTNOdMhgSxoNM',
  port        : '57235'
});

module.exports = pool;
//  host: 'localhost',     // atau IP PostgreSQL server
//   port: 5432,            // default port PostgreSQL
//   user: 'laluhilmi',      // username PostgreSQL
//   password: '', // ganti sesuai
//   database: 'laluhilmi'