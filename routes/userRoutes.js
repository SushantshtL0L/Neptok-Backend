// routes/userRoutes.js
const express = require('express');
const { getAllUsers, addUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// Base Route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

// Define routes for GET, POST, and login
router.get('/users', getAllUsers);
router.post('/users', addUser);
router.post('/users/login', loginUser);

module.exports = router;
