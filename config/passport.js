const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authModel = require('../models/authModel');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await authModel.findUserByUsername(username);
    if (!user) return done(null, false, { message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return done(null, false, { message: "Wrong password" });

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// Stores user ID in the session
passport.serializeUser((user, done) => done(null, user.id));

// Retrieves the user from the DB using the ID in the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await authModel.findUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});