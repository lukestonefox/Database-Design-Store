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

//Credit card table endpoints
app.get('/creditcard', async (req, res) => {
  try {
    const response = await model.query('SELECT * FROM creditcard;');
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get('/creditcard/:creditid', async (req, res) => {
  try {
    const { creditid } = req.params;
    const response = await model.query('SELECT * FROM creditcard WHERE creditid = $1;', [creditid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.post('/creditcard', async (req, res) => {
  try {
    const { cardnumber, expirationdate, cvv, address } = req.body;
    const response = await model.query('INSERT INTO creditcard (cardnumber, expirationdate, cvv, address) VALUES ($1, $2, $3, $4) RETURNING *;', [cardnumber, expirationdate, cvv, address]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.put('/creditcard/:creditid', async (req, res) => {
  try {
    const { creditid } = req.params;
    const { cardnumber, expirationdate, cvv, address } = req.body;
    const response = await model.query('UPDATE creditcard SET cardnumber = $1, expirationdate = $2, cvv = $3, address = $4 WHERE creditid = $5 RETURNING *;', [cardnumber, expirationdate, cvv, address, creditid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.delete('/creditcard/:creditid', async (req, res) => {
  try {
    const { creditid } = req.params;
    const response = await model.query('DELETE FROM creditcard WHERE creditid = $1 RETURNING *;', [creditid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});


//Customer table endpoints
app.get('/customer', async (req, res) => {
  try {
    const response = await model.query('SELECT * FROM customer;');
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get('/customer/:customerid', async (req, res) => {
  try {
    const { customerid } = req.params;
    const response = await model.query('SELECT * FROM customer WHERE customerid = $1;', [customerid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.post('/customer', async (req, res) => {
  try {
    const { customername, customerpassword, address1, address2, balance, creditid1, creditid2 } = req.body;
    const response = await model.query('INSERT INTO customer (customername, customerpassword, address1, address2, balance, creditid1, creditid2) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;', [customername, customerpassword, address1, address2, balance, creditid1, creditid2]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.put('/customer/:customerid', async (req, res) => {
  try {
    const { customerid } = req.params;
    const { customername, customerpassword, address1, address2, balance, creditid1, creditid2 } = req.body;
    const response = await model.query('UPDATE customer SET customername = $1, customerpassword = $2, address1 = $3, address2 = $4, balance = $5, creditid1 = $6, creditid2 = $7 WHERE customerid = $8 RETURNING *;', [customername, customerpassword, address1, address2, balance, creditid1, creditid2, customerid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.delete('/customer/:customerid', async (req, res) => {
  try {
    const { customerid } = req.params;
    const response = await model.query('DELETE FROM customer WHERE customerid = $1 RETURNING *;', [customerid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});


//Delivery plan endpoints

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});


//Products endpoints
app.get('/product', async (req, res) => {
  try {
    const response = await model.query('SELECT * FROM product;');
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});