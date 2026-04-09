const { Router } = require('express');
const passport = require('passport');
const controller = require('../controllers/authController');
const router = Router();

router.post('/sign-up', controller.signUpUser);

// Passport handles the login logic via the 'local' strategy
router.post('/log-in', passport.authenticate('local'), controller.logInUser);
router.post('/log-out', controller.logOutUser);
router.get('/sign-up',controller.getSignUpForm)
router.get('/log-in',controller.getLogInForm)
module.exports = router;