const User = require('../model/userModel');
const bcrypt = require('bcrypt');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'name'] }); // Don't send passwords
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Create a new user
const addUser = async (req, res) => {
  try {
    const { name, password, confirmPassword } = req.body;

    if (!name || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Hash password before saving to DB
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully', user: { id: newUser.id, name: newUser.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user' });
  }
};

// User login
const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    
    if (!name || !password) {
      return res.status(400).json({ error: 'Name and password are required' });
    }

    const user = await User.findOne({ where: { name } });

    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      res.json({ message: 'User Logged In' });
    } else {
      res.status(400).json({ error: 'Incorrect password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in' });
  }
};

module.exports = { getAllUsers, addUser, loginUser };
