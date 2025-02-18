const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


console.log('userController:', userController);
// Public routes (no authentication required)
router.post('/add', userController.addUser);

router.post('/login', userController.login);



module.exports = router;