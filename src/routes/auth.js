const { Router } = require('express');
const passport = require('passport');
const { authRegisterController } = require('../controllers/auth');
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

router.post('/register', authRegisterController);

router.get('/discord', passport.authenticate('discord'), (req, res) => {
  res.send(200);
});

router.get(
  '/discord/redirect',
  passport.authenticate('discord'),
  (req, res) => {
    res.send(200);
  }
);

module.exports = router;
