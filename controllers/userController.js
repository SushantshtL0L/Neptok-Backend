// controllers/userController.js
const { getUsers, createUser } = require('../model/userModel');  // For pg
// const User = require('../models/userModel');  // For Sequelize

// Controller function to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();  // For pg
    // const users = await User.findAll();  // For Sequelize
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Controller function to create a new user
const addUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = await createUser(name, email);  // For pg
    // const newUser = await User.create({ name, email });  // For Sequelize
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

module.exports = { getAllUsers, addUser };
