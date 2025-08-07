const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header (format: Bearer <token>)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token payload and attach to req.user, exclude password
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Call next middleware or route handler
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };

/*
Explanation:
- This middleware checks the Authorization header for a JWT token.
- It verifies the token and retrieves the user info from DB.
- If valid, attaches user to req.user and proceeds.
- If invalid or missing, returns 401 Unauthorized.
*/ 