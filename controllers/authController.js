const authService=require('../services/authService')
const isAuthenticated=require('../middleware/authMiddleware')
const logger=require('../utils/logger')
// const signUpUser = async (req, res, next) => {
// const logInUser = (req, res) => {
// const logOutUser = (req, res, next) => {


async function  signUpUser(req, res, next) {
  try {
    const {username,password}=req.body
    const user=await authService.signUpUser(username,password)
    logger.info('saving new user')
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    next(err);
  }

}

async function  logInUser (req, res) {
logger.info('nothing happenning here,authenticate middleware from passport runs before this,if you are seeng this login succesful ')
  res.send('logged in')
  
}
async function  logOutUser  (req, res,next) {

   req.logout((err) => {
      if (err) return next(err);
      logger.info('session destoyed from server,cookie removed from browser ')
      logger.info('logged out succesfully')
      res.json({ message: "Logged out" });
    });
}

async function getSignUpForm(req,res){
try {
  logger.info('getting sign up form')
    res.render('sign-up-form')
} catch (error) {
  logger.info('error getting form')
    res.send(error)
}
}
async function getLogInForm(req,res){
try {
  logger.info('getting login form')
    res.render('log-in-form')
} catch (error) {
  logger.info('error getting login form')
    res.send(error)
}
}

module.exports = { signUpUser, logInUser, logOutUser,getLogInForm,getSignUpForm };