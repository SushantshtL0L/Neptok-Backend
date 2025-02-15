// database/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

// Connect to PostgreSQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false, // Disable logging in production
});

sequelize.authenticate()
  .then(() => console.log('Connection to PostgreSQL has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));

module.exports = sequelize;

