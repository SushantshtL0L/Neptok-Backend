// models/userModel.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');  // Sequelize instance

// Define a User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = User;
