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

// specific fruit page
app.get('/fruits/:id', (req, res) => {
  const index = req.params.id - 1;
  const fruit = fruits[index];

  !fruit
    ? res
        .status(404)
        .send({ error: `Fruit with id ${req.params.id} not found` })
    : res
        .status(200)
        .send({ id: parseInt(req.params.id), name: `${fruit.name}` });
});

module.exports = app;
