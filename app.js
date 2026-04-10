const express=require('express')
const app=express()
const path=require('path')
const authRouter = require('./routes/authRouter')
const logger=require('./utils/logger')
const morgan=require('morgan')
const session = require('express-session');
const passport = require('passport');
require('./config/passport'); // strategy file,to be triggerd on login route post request

app.use(morgan('dev')); // Standard HTTP logging
app.use(express.urlencoded({ extended: false }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'your_keyboard_cat_secret', // Use a string from .env in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// 2. Passport Middleware (The bouncer using the locker)
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);

app.listen(3000, () =>logger.info("Server running on port 3000"));