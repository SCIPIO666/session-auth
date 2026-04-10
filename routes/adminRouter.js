const { Router } = require('express');
const router = Router();
const { isAuthenticated, authorize } = require('../middleware/authMiddleware');

// Dashboard: Any logged-in user can see this
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.user });
});

// Admin Panel: ONLY users with role 'admin' can see this
// 1st: Check if logged in. 2nd: Check if they are an admin.
router.get('/admin-settings', 
  isAuthenticated, 
  authorize('admin'), 
  (req, res) => {
    res.render('admin-panel');
});

// Lab Results: Only 'technologist' can post results
router.post('/results/upload', 
  isAuthenticated, 
  authorize('technologist'), 
  (req, res) => {
    // Logic to save results...
    res.json({ message: "Results uploaded" });
});

module.exports = router;