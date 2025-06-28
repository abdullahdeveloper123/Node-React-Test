// Import core dependencies and middleware
const express = require('express');
const { home } = require('../controllers/homeController');
const { AuthenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

// Protected route — accessible only with valid JWT
router.get('/home', AuthenticateUser, home);

// Export router to be used in main server file
module.exports = router;
