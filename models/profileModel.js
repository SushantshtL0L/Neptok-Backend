const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db'); // Assuming this is your sequelize instance

const Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {  // Ensure username field exists
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Optional, if you want unique usernames
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
  },
});

module.exports = Profile;


  