const authService=require('../services/authService')
const logger=require('../utils/logger')
const signUpUser = async (req, res, next) => {
  try {
    const user = await authService.signUpUser(req.body.username, req.body.password);
    logger.info('user being created')
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    next(err);
  }
};

const logInUser = (req, res) => {
  // If this code runs, passport.authenticate was successful
  logger.info('passport.authenticate was successful')
  res.json({ message: "Logged in successfully", user: req.user });
};

const logOutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    logger.info('logged out succesfully')
    res.json({ message: "Logged out" });
  });
};
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