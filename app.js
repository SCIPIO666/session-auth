const express=require('express')
const app=express()
const path=require('path')
const authRouter = require('./routes/authRouter')
const logger=require('./utils/logger')
const morgan=require('morgan')
require('./config/passport');
app.use(express.urlencoded({ extended: false }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(morgan('dev')); // Standard HTTP logging
app.use('/auth', authRouter);

app.listen(3000, () =>logger.info("Server running on port 3000"));