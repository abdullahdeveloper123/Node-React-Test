// Import core dependencies
const express = require('express');
const { login } = require('./authController');

const router = express.Router();

// Route to handle user login requests
router.post('/login', login);

// Export the router module
module.exports = router;
