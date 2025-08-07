const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/protected', protect, (req, res) => {
  res.json({ message: `Hello ${req.user.name}, you accessed a protected route!` });
});

module.exports = router; 