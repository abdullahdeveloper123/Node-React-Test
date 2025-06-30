// Import core dependencies
const jwt = require('jsonwebtoken');

// Hard-Coded User As per requirnment
const user = {
  email: "admin@gmail.com",
  password: "admin123"
};

// Main Authentication Logic 
const login = (req, res) => {
  const { email, password } = req.body;
  if (email === user.email && password === user.password) {
    const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "1h" });
    console.log(token);
    return res.send(token);
  }
  return res.status(401).json({ message: "Incorrect email or password!" });
};


module.exports = { login };
