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
app.get('/deliveryplan', async (req, res) => {
  try {
    const response = await model.query('SELECT * FROM deliveryplan;');
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get('/deliveryplan/:deliveryid', async (req, res) => {
  try {
    const { deliveryid } = req.params;
    const response = await model.query('SELECT * FROM deliveryplan WHERE deliveryid = $1;', [deliveryid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.post('/deliveryplan', async (req, res) => {
  try {
    const { deliverytype, deliveryprice, shipdate, deliverydate } = req.body;
    const response = await model.query('INSERT INTO deliveryplan (deliverytype, deliveryprice, shipdate, deliverydate) VALUES ($1, $2, $3, $4) RETURNING *;', [deliverytype, deliveryprice, shipdate, deliverydate]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.put('/deliveryplan/:deliveryid', async (req, res) => {
  try {
    const { deliveryid } = req.params;
    const { deliverytype, deliveryprice, shipdate, deliverydate } = req.body;
    const response = await model.query('UPDATE deliveryplan SET deliverytype = $1, deliveryprice = $2, shipdate = $3, deliverydate = $4 WHERE deliveryid = $5 RETURNING *;', [deliverytype, deliveryprice, shipdate, deliverydate, deliveryid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.delete('/deliveryplan/:deliveryid', async (req, res) => {
  try {
    const { deliveryid } = req.params;
    const response = await model.query('DELETE FROM deliveryplan WHERE deliveryid = $1 RETURNING *;', [deliveryid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});


//Order products endpoints
app.get('/orderproducts', async (req, res) => {
  try {
    const response = await model.query('SELECT * FROM orderproducts;');
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get('/orderproducts/:orderproductid', async (req, res) => {
  try {
    const { orderproductid } = req.params;
    const response = await model.query('SELECT * FROM orderproducts WHERE orderproductid = $1;', [orderproductid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.post('/orderproducts', async (req, res) => {
  try {
    const { orderid, productid } = req.body;
    const response = await model.query('INSERT INTO orderproducts (orderid, productid) VALUES ($1, $2) RETURNING *;', [orderid, productid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.put('/orderproducts/:orderproductid', async (req, res) => {
  try {
    const { orderproductid } = req.params;
    const { orderid, productid } = req.body;
    const response = await model.query('UPDATE orderproducts SET orderid = $1, productid = $2 WHERE orderproductid = $3 RETURNING *;', [orderid, productid, orderproductid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.delete('/orderproducts/:orderproductid', async (req, res) => {
  try {
    const { orderproductid } = req.params;
    const response = await model.query('DELETE FROM orderproducts WHERE orderproductid = $1 RETURNING *;', [orderproductid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});


//Order endpoints
app.get('/orders', async (req, res) => {
  try {
    const response = await model.query('SELECT * FROM orders;');
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get('/orders/:orderid', async (req, res) => {
  try {
    const { orderid } = req.params;
    const response = await model.query('SELECT * FROM orders WHERE orderid = $1;', [orderid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.post('/orders', async (req, res) => {
  try {
    const { productid, quantity, status, deliveryid } = req.body;
    const response = await model.query('INSERT INTO orders (productid, quantity, status, deliveryid) VALUES ($1, $2, $3, $4) RETURNING *;', [productid, quantity, status, deliveryid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.put('/orders/:orderid', async (req, res) => {
  try {
    const { orderid } = req.params;
    const { productid, quantity, status, deliveryid } = req.body;
    const response = await model.query('UPDATE orders SET productid = $1, quantity = $2, status = $3, deliveryid = $4 WHERE orderid = $5 RETURNING *;', [productid, quantity, status, deliveryid, orderid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.delete('/orders/:orderid', async (req, res) => {
  try {
    const { orderid } = req.params;
    const response = await model.query('DELETE FROM orders WHERE orderid = $1 RETURNING *;', [orderid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});


//Product table endpoints
app.get('/product', async (req, res) => {
  try {
    const response = await model.query('SELECT * FROM product ORDER BY productid ASC;');
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get('/product/:productid', async (req, res) => {
  try {
    const { productid } = req.params;
    const response = await model.query('SELECT * FROM product WHERE productid = $1;', [productid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.post('/product', async (req, res) => {
  try {
    const { productname, price, producttype, brand, productsize, description } = req.body;
    const response = await model.query('INSERT INTO product (productname, price, producttype, brand, productsize, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;', [productname, price, producttype, brand, productsize, description]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.put('/product/:productid', async (req, res) => {
  try {
    const { productid } = req.params;
    const { productname, price, producttype, brand, productsize, description } = req.body;
    const response = await model.query('UPDATE product SET productname = $1, price = $2, producttype = $3, brand = $4, productsize = $5, description = $6 WHERE productid = $7 RETURNING *;', [productname, price, producttype, brand, productsize, description, productid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.delete('/product/:productid', async (req, res) => {
  try {
    const { productid } = req.params;
    const response = await model.query('DELETE FROM product WHERE productid = $1 RETURNING *;', [productid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});


//Staff endpoints
app.get('/staff', async (req, res) => {
  try {
    const response = await model.query('SELECT * FROM staff;');
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get('/staff/:staffid', async (req, res) => {
  try {
    const { staffid } = req.params;
    const response = await model.query('SELECT * FROM staff WHERE staffid = $1;', [staffid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.post('/staff', async (req, res) => {
  try {
    const { staffname, staffpassword, salary, address, jobtitle } = req.body;
    const response = await model.query('INSERT INTO staff (staffname, staffpassword, salary, address, jobtitle) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [staffname, staffpassword, salary, address, jobtitle]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.put('/staff/:staffid', async (req, res) => {
  try {
    const { staffid } = req.params;
    const { staffname, staffpassword, salary, address, jobtitle } = req.body;
    const response = await model.query('UPDATE staff SET staffname = $1, staffpassword = $2, salary = $3, address = $4, jobtitle = $5 WHERE staffid = $6 RETURNING *;', [staffname, staffpassword, salary, address, jobtitle, staffid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.delete('/staff/:staffid', async (req, res) => {
  try {
    const { staffid } = req.params;
    const response = await model.query('DELETE FROM staff WHERE staffid = $1 RETURNING *;', [staffid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});


//Stock endpoints
app.get('/stock', async (req, res) => {
  try {
    const response = await model.query('SELECT * FROM stock;');
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get('/stock/:productid', async (req, res) => {
  try {
    const { productid } = req.params;
    const response = await model.query('SELECT * FROM stock WHERE productid = $1;', [productid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.post('/stock', async (req, res) => {
  try {
    const { productid, stockcount, warehouseid } = req.body;
    const response = await model.query('INSERT INTO stock (productid, stockcount, warehouseid) VALUES ($1, $2, $3) RETURNING *;', [productid, stockcount, warehouseid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.put('/stock/:productid', async (req, res) => {
  try {
    const { productid } = req.params;
    const { stockcount, warehouseid } = req.body;
    const response = await model.query('UPDATE stock SET stockcount = $1, warehouseid = $2 WHERE productid = $3 RETURNING *;', [stockcount, warehouseid, productid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.delete('/stock/:productid/:warehouseid', async (req, res) => {
  try {
    const { productid, warehouseid } = req.params;
    const response = await model.query('DELETE FROM stock WHERE productid = $1 AND warehouseid = $2 RETURNING *;', [productid, warehouseid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});


//Supplier endpoints
app.get('/supplier', async (req, res) => {
  try {
    const response = await model.query('SELECT * FROM supplier;');
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get('/supplier/:supplierid', async (req, res) => {
  try {
    const { supplierid } = req.params;
    const response = await model.query('SELECT * FROM supplier WHERE supplierid = $1;', [supplierid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.post('/supplier', async (req, res) => {
  try {
    const { suppliername, address } = req.body;
    const response = await model.query('INSERT INTO supplier (suppliername, address) VALUES ($1, $2) RETURNING *;', [suppliername, address]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.put('/supplier/:supplierid', async (req, res) => {
  try {
    const { supplierid } = req.params;
    const { suppliername, address } = req.body;
    const response = await model.query('UPDATE supplier SET suppliername = $1, address = $2 WHERE supplierid = $3 RETURNING *;', [suppliername, address, supplierid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.delete('/supplier/:supplierid', async (req, res) => {
  try {
    const { supplierid } = req.params;
    const response = await model.query('DELETE FROM supplier WHERE supplierid = $1 RETURNING *;', [supplierid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});


//Supplier products endpoints
app.get('/supplierproducts', async (req, res) => {
  try {
    const response = await model.query('SELECT * FROM supplierproducts;');
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get('/supplierproducts/:supplierproductid', async (req, res) => {
  try {
    const { supplierproductid } = req.params;
    const response = await model.query('SELECT * FROM supplierproducts WHERE supplierproductid = $1;', [supplierproductid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.post('/supplierproducts', async (req, res) => {
  try {
    const { supplierprice, supplierid, productid } = req.body;
    const response = await model.query('INSERT INTO supplierproducts (supplierprice, supplierid, productid) VALUES ($1, $2, $3) RETURNING *;', [supplierprice, supplierid, productid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.put('/supplierproducts/:supplierproductid', async (req, res) => {
  try {
    const { supplierproductid } = req.params;
    const { supplierprice, supplierid, productid } = req.body;
    const response = await model.query('UPDATE supplierproducts SET supplierprice = $1, supplierid = $2, productid = $3 WHERE supplierproductid = $4 RETURNING *;', [supplierprice, supplierid, productid, supplierproductid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.delete('/supplierproducts/:supplierproductid', async (req, res) => {
  try {
    const { supplierproductid } = req.params;
    const response = await model.query('DELETE FROM supplierproducts WHERE supplierproductid = $1 RETURNING *;', [supplierproductid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});


//Warehouse endpoints
app.get('/warehouse', async (req, res) => {
  try {
    const response = await model.query('SELECT * FROM warehouse;');
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get('/warehouse/:warehouseid', async (req, res) => {
  try {
    const { warehouseid } = req.params;
    const response = await model.query('SELECT * FROM warehouse WHERE warehouseid = $1;', [warehouseid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.post('/warehouse', async (req, res) => {
  try {
    const { address, capacity } = req.body;
    const response = await model.query('INSERT INTO warehouse (address, capacity) VALUES ($1, $2) RETURNING *;', [address, capacity]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.put('/warehouse/:warehouseid', async (req, res) => {
  try {
    const { warehouseid } = req.params;
    const { address, capacity } = req.body;
    const response = await model.query('UPDATE warehouse SET address = $1, capacity = $2 WHERE warehouseid = $3 RETURNING *;', [address, capacity, warehouseid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.delete('/warehouse/:warehouseid', async (req, res) => {
  try {
    const { warehouseid } = req.params;
    const response = await model.query('DELETE FROM warehouse WHERE warehouseid = $1 RETURNING *;', [warehouseid]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
});



app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});