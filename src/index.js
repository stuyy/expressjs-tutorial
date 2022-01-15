const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}!`));

const groceryList = [
  {
    item: 'milk',
    quantity: 2,
  },
  {
    item: 'cereal',
    quantity: 1,
  },
  {
    item: 'pop-tarts',
    quantity: 1,
  },
];

app.get('/groceries', (request, response) => {
  response.send(groceryList);
});

app.get('/groceries/:item', (request, response) => {
  const { item } = request.params;
  const groceryItem = groceryList.find((g) => g.item === item);
  response.send(groceryItem);
});

app.post('/groceries', (request, response) => {
  console.log(request.body);
  groceryList.push(request.body);
  response.send(201);
});
