const express = require('express');
const cors = require('cors');

const logger = require('./logger');

const app = express();

// middleware section
app.use(cors());
app.use(express.json());
app.use(logger);

// home page
app.get('/', (req, res) => {
  res.status(200).send('Are you reddy!');
});

// app.get(/fruits)

module.exports = app;
