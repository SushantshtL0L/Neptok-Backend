// const multer = require('multer');
// const path = require('path');

// // Set up storage for uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// // File filter to allow only video files
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['video/mp4', 'video/mpeg', 'video/quicktime'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true); // Accept the file
//   } else {
//     cb(new Error('Invalid file type. Only video files are allowed.'), false);
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit
// });

// // Middleware for handling file upload
// const uploadVideo = upload.single('video');

// // Controller function for handling the upload
// const handleVideoUpload = (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: 'No file uploaded or invalid file type' });
//   }

//   // File uploaded successfully
//   res.json({ message: 'File uploaded successfully', file: req.file });
// };

// // Error handling middleware
// const handleUploadError = (err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
//     // Handle Multer errors (e.g., file size limit exceeded)
//     return res.status(400).json({ message: err.message });
//   } else if (err) {
//     // Handle other errors (e.g., invalid file type)
//     return res.status(400).json({ message: err.message });
//   }
//   next();
// };

// module.exports = { uploadVideo, handleVideoUpload, handleUploadError };









// const Video = require('../models/video');
// const multer = require('multer');
// const path = require('path');

// // Set up storage for uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// // File filter to allow only video files
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['video/mp4', 'video/mpeg', 'video/quicktime'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true); // Accept the file
//   } else {
//     cb(new Error('Invalid file type. Only video files are allowed.'), false);
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit
// });

// // Middleware for handling file upload
// const uploadVideo = upload.single('video');

// // Controller function for handling the upload
// const handleVideoUpload = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded or invalid file type' });
//     }

//     const { description, user_id = 1 } = req.body; // Default user_id if not provided

//     if (!description) {
//       return res.status(400).json({ message: 'description is required' });
//     }

//     const newVideo = await Video.create({
//       user_id: user_id, // Use the provided or default user_id
//       video_url: `/uploads/${req.file.filename}`,
//       description: description,
//       mimetype: req.file.mimetype,
//       size: req.file.size
//     });

//     res.status(201).json({
//       message: 'Video uploaded and saved successfully',
//       video: newVideo
//     });
//   } catch (error) {
//     console.error('Error saving video to database:', error);
//     res.status(500).json({ message: 'Error saving video to database', error: error.message });
//   }
// };

// // Controller function to get all videos
// const getAllVideos = async (req, res) => {
//   try {
//     const videos = await Video.findAll();
//     res.status(200).json(videos);
//   } catch (error) {
//     console.error('Error fetching videos:', error);
//     res.status(500).json({ message: 'Error fetching videos', error: error.message });
//   }
// };

// // Error handling middleware
// const handleUploadError = (err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
//     // Handle Multer errors (e.g., file size limit exceeded)
//     return res.status(400).json({ message: err.message });
//   } else if (err) {
//     // Handle other errors (e.g., invalid file type)
//     return res.status(400).json({ message: err.message });
//   }
//   next();
// };

// module.exports = {
//   uploadVideo,
//   handleVideoUpload,
//   getAllVideos,
//   handleUploadError
// };







const Video = require('../models/video');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter to allow only video files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['video/mp4', 'video/mpeg', 'video/quicktime'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only video files are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit
});

// Middleware for handling file upload
const uploadVideo = upload.single('video');

// Controller function for handling the upload
const handleVideoUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded or invalid file type' });
    }

    const { description, user_id = 1 } = req.body; // Default user_id if not provided

    if (!description) {
      return res.status(400).json({ message: 'description is required' });
    }

    const newVideo = await Video.create({
      user_id: user_id, // Use the provided or default user_id
      video_url: `/uploads/${req.file.filename}`,
      description: description,
      mimetype: req.file.mimetype,
      size: req.file.size
    });

    res.status(201).json({
      message: 'Video uploaded and saved successfully',
      video: newVideo
    });
  } catch (error) {
    console.error('Error saving video to database:', error);
    res.status(500).json({ message: 'Error saving video to database', error: error.message });
  }
};

// Controller function to get all videos
const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.findAll();
    res.status(200).json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Error fetching videos', error: error.message });
  }
};

// Controller function to delete a video by ID
const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the video in the database
    const video = await Video.findByPk(id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Get the file path to delete from storage
    const filePath = path.join(__dirname, '..', video.video_url);

    // Delete the file from storage
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (fileError) {
      console.error('Error deleting video file:', fileError);
      // Continue even if file deletion fails
    }

    // Delete the record from the database
    await video.destroy();

    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ message: 'Error deleting video', error: error.message });
  }
};

// Error handling middleware
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handle Multer errors (e.g., file size limit exceeded)
    return res.status(400).json({ message: err.message });
  } else if (err) {
    // Handle other errors (e.g., invalid file type)
    return res.status(400).json({ message: err.message });
  }
  next();
};

module.exports = {
  uploadVideo,
  handleVideoUpload,
  getAllVideos,
  deleteVideo, // Added deleteVideo function
  handleUploadError
};
