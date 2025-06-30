// Import core dependencies
const jwt = require('jsonwebtoken');

// Hard-coded user as per test requirement
const user = {
  email: "admin@gmail.com",
  password: "admin123"
};

// Temporary in-memory store for refresh tokens
const refreshTokens = [];

/**
 * Login Controller — handles authentication & token generation
 */
const login = (req, res) => {
  const { email, password } = req.body;

  if (email === user.email && password === user.password) {
    // Generate Access Token (valid for 15 minutes)
    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "15m" });

    // Generate Refresh Token (valid for 7 days)
    const refreshToken = jwt.sign({ email }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

    // Store the refresh token in memory
    refreshTokens.push(refreshToken);

    return res.status(200).json({ token, refreshToken });
  }

  return res.status(401).json({ message: "Incorrect email or password!" });
};

/**
 * Refresh Token Controller — issues a new access token if refresh token is valid
 */
const refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;

  // Check if refresh token is provided
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required." });
  }

  // Validate that refresh token exists in store
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: "Invalid or unknown refresh token." });
  }

  // Verify the refresh token
  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired refresh token." });
    }

    // Issue new access token (valid for 15 minutes)
    const newAccessToken = jwt.sign({ email: decoded.email }, process.env.SECRET_KEY, { expiresIn: "15m" });

    return res.status(200).json({ accessToken: newAccessToken });
  });
};

// Export controllers and refresh token store
module.exports = {
  login,
  refreshAccessToken,
  refreshTokens
};
