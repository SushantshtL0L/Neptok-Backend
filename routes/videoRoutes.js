const express = require('express');
const { uploadVideo, getVideos, likeVideo, addComment, upload } = require('../controllers/videoController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Upload a video (protected route)
router.post('/upload', authMiddleware, upload.single('video'), uploadVideo);

// Fetch all videos
router.get('/videos', getVideos);

// Like a video (protected route)
router.post('/videos/:videoId/like', authMiddleware, likeVideo);

// Add a comment to a video (protected route)
router.post('/videos/:videoId/comment', authMiddleware, addComment);

module.exports = router;