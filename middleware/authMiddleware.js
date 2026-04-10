const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Please log in first" });
};

module.exports = { isAuthenticated };


//will be used for protecting routes

// // routes/userRouter.js or authRouter.js
// const { Router } = require('express');
// const router = Router();
// const { isAuthenticated } = require('../middleware/authMiddleware');

// // PUBLIC: Anyone can see this
// router.get('/about', (req, res) => res.send("About us..."));

// // PROTECTED: Only logged-in users reach the controller
// // If isAuthenticated fails, it sends the 401 error and the controller NEVER runs
// router.get('/dashboard', isAuthenticated, (req, res) => {
//     res.render('dashboard', { user: req.user });
// });

// // PROTECTED: Settings page
// router.get('/settings', isAuthenticated, (req, res) => {
//     res.render('settings');
// });

// module.exports = router;