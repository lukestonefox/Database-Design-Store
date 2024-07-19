require('dotenv').config();
const {Pool} = require('pg');
const database = new Pool({
  user: 'postgres',
  host: 'databaseproject.cxw8wk2w0dii.us-east-2.rds.amazonaws.com',
  database: 'DatabaseProject',
  password: 'ILoveDatabaseDesign7!',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

console.log(`RDS_HOSTNAME: ${process.env.RDS_HOSTNAME}`);

module.exports = database;
