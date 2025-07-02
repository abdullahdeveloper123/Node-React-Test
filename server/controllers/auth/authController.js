// Import dependencies
const jwt = require('jsonwebtoken');
const { ensureDataFile, getTokens, saveTokens } = require('../../services/auth/refreshTokenStore')

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

    // create file not exists and save token in file
    ensureDataFile()
    saveTokens(refreshTokens)

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

  const storedTokens = getTokens();

  // Validate that refresh token exists in store
  if (!storedTokens.includes(refreshToken)) {
    return res.status(403).json({ message: "Invalid or unknown refresh token." });
  }

  // Verify the refresh token
  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired refresh token." });
    }

    // Remove used refresh token
    const updatedTokens = storedTokens.filter((t) => t !== refreshToken);

    // Issue new access token (15m)
    const newAccessToken = jwt.sign(
      { email: decoded.email },
      process.env.SECRET_KEY,
      { expiresIn: "15m" }
    );

    // Issue new refresh token (7d)
    const newRefreshToken = jwt.sign(
      { email: decoded.email },
      process.env.REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Add new refresh token to store and save
    updatedTokens.push(newRefreshToken);
    saveTokens(updatedTokens);

    // Send both tokens
    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  });
};


// Check token validation for protected client view
const verifyAccessToken = (req, res) => {
  return res.status(200).json({
    message: 'Token is valid',
  });
}

// Export controllers and refresh token store
module.exports = {
  login,
  refreshAccessToken,
  verifyAccessToken
};
