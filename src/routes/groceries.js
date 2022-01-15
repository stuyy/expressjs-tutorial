const { Router } = require('express');

const router = Router();

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

router.get('/', (request, response) => {
  response.cookie('visited', true, {
    maxAge: 60000,
  });
  response.send(groceryList);
});

router.get('/:item', (request, response) => {
  console.log(request.cookies);
  const { item } = request.params;
  const groceryItem = groceryList.find((g) => g.item === item);
  response.send(groceryItem);
});

router.post('/', (request, response) => {
  console.log(request.body);
  groceryList.push(request.body);
  response.send(201);
});

router.get('/shopping/cart', (request, response) => {
  const { cart } = request.session;
  console.log('Cart');
  if (!cart) {
    response.send('You have no cart session');
  } else {
    response.send(cart);
  }
});

router.post('/shopping/cart/item', (request, response) => {
  const { item, quantity } = request.body;
  const cartItem = { item, quantity };
  const { cart } = request.session;
  if (cart) {
    request.session.cart.items.push(cartItem);
  } else {
    request.session.cart = {
      items: [cartItem],
    };
  }
  response.send(201);
});

module.exports = router;
