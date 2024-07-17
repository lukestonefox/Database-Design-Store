require('dotenv').config()
const Pool = require('pg').Pool
const database = new Pool({
  user: 'postgres',
  host: process.env.RDS_HOSTNAME,
  database: 'DatabaseProject',
  password: process.env.RDS_PASSWORD,
  port: 5432,
});

console.log(`RDS_HOSTNAME: ${process.env.RDS_HOSTNAME}`); // Run this test to ensure your .env is setup correctly

// Let's create some functions for queries
const getVersion = () => {
  return new Promise(function(resolve, reject) {
    database.query('SELECT Version();', (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res.rows);
    });
  });
};

module.exports = {
  getVersion,
};