// 






const multer = require('multer');
const path = require('path');

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
const handleVideoUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded or invalid file type' });
  }

  // File uploaded successfully
  res.json({ message: 'File uploaded successfully', file: req.file });
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

module.exports = { uploadVideo, handleVideoUpload, handleUploadError };