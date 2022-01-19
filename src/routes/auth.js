const { Router } = require('express');
const passport = require('passport');
const User = require('../database/schemas/User');
const { hashPassword, comparePassword } = require('../utils/helpers');

const router = Router();

// router.post('/login', async (request, response) => {
//   const { email, password } = request.body;
//   if (!email || !password) return response.send(400);
//   const userDB = await User.findOne({ email });
//   if (!userDB) return response.send(401);
//   const isValid = comparePassword(password, userDB.password);
//   if (isValid) {
//     console.log('Authenticated Successfully!');
//     request.session.user = userDB;
//     return response.send(200);
//   } else {
//     console.log('Failed to Authenticate');
//     return response.send(401);
//   }
// });

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('Logged In');
  res.send(200);
});

router.post('/register', async (request, response) => {
  const { email } = request.body;
  const userDB = await User.findOne({ email });
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
