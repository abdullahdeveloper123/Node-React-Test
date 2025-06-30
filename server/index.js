// Import core dependencies
const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
require('dotenv').config();

// Import route modules
const authRoute = require('./controllers/auth/_routes');
const meetingRoutes = require('./controllers/meeting/_routes');



// Initialize Express app and server port
const app = express();
const port = 8000;

// Apply global middlewares
app.use(cors());
app.use(parser.json());

// Building Base Urls
app.use('/api', authRoute);
app.use('/api', meetingRoutes);


// Stating Server
const server = app.listen(port, () => {
  const protocol = (String(process.env.HTTPS) === 'true' || process.env.NODE_ENV === 'production') ? 'https' : 'http';
  const { address } = server.address();
  const host = address === '::' ? 'localhost' : address;
  console.log(`Server listening at ${protocol}://${host}:${port}/`);
});
