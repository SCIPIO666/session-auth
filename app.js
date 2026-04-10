const express=require('express')
const app=express()
const path=require('path')
const authRouter = require('./routes/authRouter')
const logger=require('./utils/logger')
const morgan=require('morgan')
const session = require('express-session');
const passport = require('passport');
require('./config/passport'); // strategy file,to be triggerd on login route post request

app.use(express.urlencoded({ extended: false }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(morgan('dev')); // Standard HTTP logging
app.use('/auth', authRouter);

app.listen(3000, () =>logger.info("Server running on port 3000"));