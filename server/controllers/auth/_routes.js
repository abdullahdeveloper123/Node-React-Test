// Import core dependencies
const express = require('express');
const { login, refreshAccessToken} = require('./authController');

const router = express.Router();

// Route to handle user login requests
router.post('/login', login);

// Route to recreates new access token 
router.post('/refresh-token', refreshAccessToken);

// Export the router module
module.exports = router;
