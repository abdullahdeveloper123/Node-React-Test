// Import core dependencies
const jwt = require('jsonwebtoken');

// User Authentication Middleware Logic
const AuthenticateUser = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
//   Check IF Token Exist In Request
  if (!token) {
    console.log('Token is missing');
    return res.status(401).json({ message: "Token is missing" });
  }

//   Verify Token Validation
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user;

    // Forward User
    next();
  });
};

module.exports = { AuthenticateUser };
