const { Router } = require('express');
const User = require('../database/schemas/User');
const { hashPassword } = require('../utils/helpers');

const router = Router();

router.post('/login', (request, response) => {
  const { username, password } = request.body;
  if (username && password) {
    if (request.session.user) {
      response.send(request.session.user);
    } else {
      request.session.user = {
        username,
      };
      response.send(request.session);
    }
  } else response.send(401);
});

router.post('/register', async (request, response) => {
  const { username, email } = request.body;
  const userDB = await User.findOne({ $or: [{ username }, { email }] });
  if (userDB) {
    response.status(400).send({ msg: 'User already exists!' });
  } else {
    const password = hashPassword(request.body.password);
    console.log(password);
    const newUser = await User.create({ username, password, email });
    response.send(201);
  }
});

module.exports = router;
