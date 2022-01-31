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

passport.use(
  new Strategy(
    {
      clientID: 'REPLACE WITH YOUR OWN',
      clientSecret: 'REPLACE WITH YOUR OWN',
      callbackURL: 'http://localhost:3001/api/v1/auth/discord/redirect',
      scope: ['identify'],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(accessToken, refreshToken);
      console.log(profile);
      try {
        const discordUser = await DiscordUser.findOne({
          discordId: profile.id,
        });
        if (discordUser) {
          console.log(`Found User: ${discordUser}`);
          return done(null, discordUser);
        } else {
          const newUser = await DiscordUser.create({
            discordId: profile.id,
          });
          console.log(`Created User: ${newUser}`);
          return done(null, newUser);
        }
      } catch (err) {
        console.log(err);
        return done(err, null);
      }
    }
  )
);
