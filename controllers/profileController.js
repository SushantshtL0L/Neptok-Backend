// /controllers/profileController.js
const { getProfile, updateProfile } = require('../models/profileModel');

// Controller to get the current profile
const getProfileData = (req, res) => {
  const profile = getProfile();  // Get profile from the model
  res.json(profile); // Return the profile data as a JSON response
};

// Controller to update the profile
const updateProfileData = (req, res) => {
  const { name, bio } = req.body;  // Get the name and bio from the request body
  const updatedProfile = updateProfile(name, bio);  // Update the profile using the model
  res.json({
    message: 'Profile updated successfully!',
    profile: updatedProfile,  // Return the updated profile
  });
};

module.exports = { getProfileData, updateProfileData };
