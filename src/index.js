const express = require('express');
const groceriesRoute = require('./routes/groceries');
const marketsRoute = require('./routes/markets');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});

app.use('/api/v1/groceries', groceriesRoute);
app.use('/api/v1/markets', marketsRoute);

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}!`));
