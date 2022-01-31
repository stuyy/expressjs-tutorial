const passport = require('passport');
const { Strategy } = require('passport-discord');
const DiscordUser = require('../database/schemas/DiscordUser');

passport.serializeUser((user, done) => {
  console.log('Serializing User...');
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log('Deserializing User');
  console.log(id);
  try {
    const user = await DiscordUser.findById(id);
    if (!user) throw new Error('User not found');
    console.log(user);
    done(null, user);
  } catch (err) {
    console.log(err);
    done(err, null);
  }
});

async function discordVerifyFunction(accessToken, refreshToken, profile, done) {
  const { id: discordId } = profile;
  try {
    const discordUser = await DiscordUser.findOne({ discordId });
    if (discordUser) {
      return done(null, discordUser);
    } else {
      const newUser = await DiscordUser.create({ discordId });
      return done(null, newUser);
    }
  } catch (err) {
    console.log(err);
    return done(err, null);
  }
}

passport.use(
  new Strategy(
    {
      clientID: '',
      clientSecret: '',
      callbackURL: 'http://localhost:3001/api/v1/auth/discord/redirect',
      scope: ['identify'],
    },
    discordVerifyFunction
  )
);

module.exports = { discordVerifyFunction };
