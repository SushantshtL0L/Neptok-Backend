// models/video.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');  // Adjust path as necessary

const Video = sequelize.define('Video', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  // Ensure auto-increment is set
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  video_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  }
});

module.exports = Video;
