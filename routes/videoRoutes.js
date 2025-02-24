const express = require('express');
const router = express.Router();
const upload = require('../middleware/videoUpload'); // Import upload middleware
const videoController = require('../controllers/videoController'); // Import controller

// Add a new video (upload a video)
router.post('/videos', videoController.addVideo);
// Get all videos
router.get('/', videoController.getAllVideos);

// Get a single video by ID
router.get('/:id', videoController.getVideoById);

// Get videos by a specific user
router.get('/user/:userId', videoController.getVideosByUser);

// Delete a video by ID
router.delete('/:id', videoController.deleteVideo);

module.exports = router;
