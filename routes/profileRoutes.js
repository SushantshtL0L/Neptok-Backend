// // /routes/profileRoutes.js
// const express = require('express');
// const router = express.Router();
// const { getProfileData, updateProfileData } = require('../controllers/profileController');

// // Route to get profile data
// router.get('/profile', getProfileData);

// // Route to update profile data
// router.put('/profile', updateProfileData);

// module.exports = router;

const express = require('express');
const router = express.Router();
const Profile = require('../models/profileModel'); // Assuming you have a profile model

// Update user profile using username from the body
router.put('/profile', async (req, res) => {
  const { username, name, bio } = req.body;

  // Validate if username is provided
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    // Find user based on username
    const user = await Profile.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update profile
    user.name = name || user.name;
    user.bio = bio || user.bio;
    await user.save();

    res.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
