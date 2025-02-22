const Video = require('../models/Video');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  },
});

const upload = multer({ storage });

// Upload a video
const uploadVideo = async (req, res) => {
  try {
    const { userId } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const video = await Video.create({
      filename: file.filename,
      path: file.path,
      userId,
    });

    res.status(201).json({ message: 'Video uploaded successfully!', video });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading video.' });
  }
};

// Fetch all videos
const getVideos = async (req, res) => {
  try {
    const videos = await Video.findAll({ include: User });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching videos.' });
  }
};

// Like a video
const likeVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findByPk(videoId);
    if (!video) {
      return res.status(404).json({ error: 'Video not found.' });
    }

    video.likes += 1;
    await video.save();

    res.status(200).json({ message: 'Video liked!', video });
  } catch (error) {
    res.status(500).json({ error: 'Error liking video.' });
  }
};

// Add a comment to a video
const addComment = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { comment } = req.body;

    const video = await Video.findByPk(videoId);
    if (!video) {
      return res.status(404).json({ error: 'Video not found.' });
    }

    // Assuming comments are stored as an array in the Video model
    video.comments = video.comments || [];
    video.comments.push(comment);
    await video.save();

    res.status(200).json({ message: 'Comment added!', video });
  } catch (error) {
    res.status(500).json({ error: 'Error adding comment.' });
  }
};

module.exports = { uploadVideo, getVideos, likeVideo, addComment, upload };