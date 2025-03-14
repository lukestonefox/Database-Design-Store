require('dotenv').config();
const {Pool} = require('pg');
const database = new Pool({
  user: 'postgres',
  host: '*',
  database: '*',
  password: '*',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

//console.log(`RDS_HOSTNAME: ${process.env.RDS_HOSTNAME}`);

module.exports = database;
