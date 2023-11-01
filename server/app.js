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

// create a fruit
app.post('/fruits', (req, res) => {
  const fruit = req.body;

  if (!fruit.name)
    res.status(422).send({ error: 'you need a name to create a fruit' });

  const lastFruit = fruits[fruits.length - 1];

  const lastId = lastFruit ? lastFruit.id + 1 : 1;
  fruit.id = lastId;

  fruits.push(fruit);
  res.status(201).send(fruit);
});

// update a fruit
app.patch('/fruits/:id', (req, res) => {
  const fruit = req.body;
  const index = req.params.id - 1;
  const existingFruit = fruits[index];

  if (!fruit.name)
    res.status(422).send({ error: 'You need to specify the name' });

  if (!existingFruit)
    res.status(404).send({ error: 'cannot update missing fruit' });

  existingFruit.name = fruit.name;
  res.status(200).send(existingFruit);
});

// delete a fruit
app.delete('/fruits/:id', (req, res) => {
  const { id } = req.params;
  const index = fruits.findIndex((e) => e.id === parseInt(id));
  const fruit = fruits[index];

  if (!fruit) res.sendStatus(404);
  fruits.splice(index, 1);

  res.sendStatus(204);
});

module.exports = app;
