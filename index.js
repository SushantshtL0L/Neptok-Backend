// index.js
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const app = express();

// Middleware
app.use(bodyParser.json());  // Parse incoming JSON requests

// Use the routes
app.use('/api', userRoutes);

// Start the server
const port = 3000;
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

