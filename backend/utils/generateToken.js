const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  // Signs a JWT token containing user ID
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',  // Token valid for 1 hour
  });
};

module.exports = generateToken;

/*
Explanation:
- This function creates a JWT token with user ID payload.
- The token is signed with the secret key and expires after 1 hour.
*/ 