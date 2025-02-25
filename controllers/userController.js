const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Get all users with pagination
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Defaults to page 1 and 10 results per page
    const users = await User.findAll({
      attributes: ['id', 'name'],
      limit: limit,
      offset: (page - 1) * limit
    });
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
  
      // Validate input
      if (!name || !password || !confirmPassword) {
        return res.status(400).json({ error: 'Name, password, and confirmPassword are required' });
      }
  
      // Check if passwords match
      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }
  
      // Check if the username already exists
      const existingUser = await User.findOne({ where: { name } });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the new user in the database
      const newUser = await User.create({
        name,
        password: hashedPassword
      });
  
      // Respond with the created user details (excluding password)
      res.status(201).json({
        status: 'User created successfully',
        data: {
          id: newUser.id,
          name: newUser.name,
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to create user', details: error.message });
    }
  };
  
  const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Please provide username and password" });
    }

    try {

       // Log the received username
       console.log("Username received in login:", username);

       
        // Find user by username
        const user = await User.findOne({ where: { name: username } });


        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        if (!user.password) {
            return res.status(500).json({ error: "User password is missing in the database" });
        }

        // Log for debugging
        console.log("Entered Password:", password);
        console.log("Stored Hashed Password:", user.password);

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match result:", isMatch);  // Log result of comparison

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, username: user.name },
            'your_secret_key',
            { expiresIn: '1h' }
        );

        // Return token in response
        return res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
};

module.exports = { getAllUsers, addUser,login };