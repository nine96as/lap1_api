const express = require('express');
const cors = require('cors');

const logger = require('./logger');
const fruits = require('./fruits');

const app = express();

// middleware section
app.use(cors());
app.use(express.json());
app.use(logger);

// home page
app.get('/', (req, res) => {
  res.status(200).send('Are you reddy!');
});

// list of fruits
app.get('/fruits', (req, res) => {
  res.send(fruits);
});

module.exports = app;
