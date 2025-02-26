// const express = require('express');
// const router = express.Router();
// const upload = require('../middleware/videoUpload'); // Import upload middleware
// const videoController = require('../controllers/videoController'); // Import controller

// // Add a new video (upload a video)
// router.post('/videos', videoController.addVideo);
// // Get all videos
// router.get('/', videoController.getAllVideos);

// // Get a single video by ID
// router.get('/:id', videoController.getVideoById);

// // Get videos by a specific user
// router.get('/user/:userId', videoController.getVideosByUser);

// // Delete a video by ID
// router.delete('/:id', videoController.deleteVideo);

// module.exports = router;






// routes/videoRoutes.js
// const express = require('express');
// const { uploadVideo, handleVideoUpload, handleUploadError } = require('../controllers/videoController');

// const router = express.Router();

// // Route for uploading a video
// router.post('/upload', uploadVideo, handleVideoUpload, handleUploadError);

// // Route for fetching all uploaded videos (example)
// router.get('/videos', (req, res) => {
//   // Logic to fetch and return a list of uploaded videos
//   res.json({ message: 'List of uploaded videos' });
// });

// // Route for fetching a specific video by ID (example)
// router.get('/videos/:id', (req, res) => {
//   const videoId = req.params.id;
//   // Logic to fetch and return a specific video
//   res.json({ message: `Details for video ${videoId}` });
// });

// module.exports = router;

// const express = require('express');
// const { uploadVideo, handleVideoUpload, getAllVideos, handleUploadError } = require('../controllers/videoController');

// const router = express.Router();

// // Video upload route
// router.post('/upload', uploadVideo, handleVideoUpload, handleUploadError);

// // Route for fetching all uploaded videos (example)
// router.get('/video-list', getAllVideos);

// module.exports = router;



const express = require('express');
const { 
    uploadVideo, 
    handleVideoUpload, 
    getAllVideos, 
    handleUploadError, 
    deleteVideo 
} = require('../controllers/videoController');

const router = express.Router();

// Video upload route
router.post('/upload', uploadVideo, handleVideoUpload, handleUploadError);

// Route for fetching all uploaded videos
router.get('/video-list', getAllVideos);

// Route for deleting a video
router.delete('/delete/:id', deleteVideo);

module.exports = router;
