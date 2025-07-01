// Import core dependencies
const express = require('express');
const { login, refreshAccessToken, verifyAccessToken} = require('./authController');
const {AuthenticateUser} = require('../../middlewares/authMiddleware')
const router = express.Router();

// Route to handle user login requests
router.post('/login', login);

// Route to recreates new access token 
router.post('/refresh-token', refreshAccessToken);

// Route to verify if AccessToken valid or not
router.get('/verifyAccessToken',AuthenticateUser, verifyAccessToken);


// Export the router module
module.exports = router;
