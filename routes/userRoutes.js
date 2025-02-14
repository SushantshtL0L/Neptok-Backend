// routes/userRoutes.js
const express = require('express');
const { getAllUsers, addUser } = require('../controllers/userController');

const router = express.Router();

// Define routes for GET and POST requests
router.get('/users', getAllUsers);
router.post('/users', addUser);

module.exports = router;
