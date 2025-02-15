const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./database/db');

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests

// Use the routes
app.use('/api', userRoutes);

// Sync database and start server
const port = 3000;

sequelize.sync()
  .then(() => {
    console.log('Database connected & tables created');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to database:', err);
  });
