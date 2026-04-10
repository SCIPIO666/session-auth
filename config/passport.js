const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy; 
const authModel=require('../models/authModel')

passport.use(new LocalStrategy(async (username, password, done) => { 
  try {
    const user = await authModel.findUserByUsername(username);
    
    // 1. Check if user exists
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    // 2. The Password Math
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Wrong password" });
    }

    // 3. Success! Pass the user to the next step (Serialize)
    return done(null, user); 
  } catch (error) {
    return done(error);
  }
}));

// STEP A: STORE (Happens once on Login)
// "Take the user object, extract the ID, and put it in the session cookie"
passport.serializeUser((user, done) => {
  done(null, user.id);//saving to session store once 
});

// STEP B: READ (Happens on EVERY request after login)
// "Take the ID from the cookie, find the user in DB, and put them in req.user"
passport.deserializeUser(async (id, done) => {
  try {
    const user = await authModel.findUserById(id);
    done(null, user);//attaching user to request each request
  } catch (err) {
    done(err);
  }
});
