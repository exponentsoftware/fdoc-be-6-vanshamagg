const passport = require('passport');
const LocalStrategy = require('passport-local');
const { User } = require('../database');

passport.use(new LocalStrategy(
  async (username, password, done) => {
    const user = await User.findOne({ username });

    console.log(user)

    if (user && user.password === password) return done(null, user);

    else return done(new Error('Invalid Username or password'));
  }
));


