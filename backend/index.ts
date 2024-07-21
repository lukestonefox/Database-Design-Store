const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

const model = require('./model.ts');

app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/version', async (req, res) => {
  try {
    const response = await model.query('SELECT version();');
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get('/test', async (req, res) => {
  try {
    const response = await model.query('SELECT * FROM test;');
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get('/getLoginInfo', async (req, res) => {
  try {
    const response = await model.query('SELECT * FROM test;');
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
