const { Router } = require('express');

const router = Router();

const supermarkets = [
  {
    store: 'Whole Foods',
  },
  {
    store: 'Trader Joes',
  },
  {
    store: 'Albertsons',
  },
];

router.get('', (request, response) => {
  response.send(supermarkets);
});

module.exports = router;
