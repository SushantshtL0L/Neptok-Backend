// database/db.js
const { Sequelize } = require('sequelize');

// Set up Sequelize connection
const sequelize = new Sequelize('neptok_db', 'postgres', 'admin123', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize.authenticate()
  .then(() => console.log('Connection to PostgreSQL has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));

module.exports = sequelize;

