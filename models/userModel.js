const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');  // Sequelize instance

// Define the User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Ensure unique names
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,  // Store hashed password
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: true,  
  },
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt
  tableName: 'users', // Explicit table name in PostgreSQL
});

module.exports = User;