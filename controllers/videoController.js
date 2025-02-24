const Video = require("../model/Video");
const { Op } = require("sequelize");

// Add a new Video
exports.addVideo = async (req, res) => {
  try {
    // Destructure required fields from request body
    const { user_id, video_url, description } = req.body;

    // Input validation
    if (!user_id || !video_url) {
      return res.status(400).json({ 
        error: "User ID and video URL are required fields" 
      });
    }

    // Create new video record in database
    const newVideo = await Video.create({
      user_id,        // Foreign key linking to user who uploaded
      video_url,      // URL where video is hosted
      description     // Optional video description
    });

    // Return success response with created video
    return res.status(201).json(newVideo);

  } catch (error) {
    // Log error and return error response
    console.error("Error adding video:", error);
    return res.status(500).json({ 
      error: "Internal server error while adding video" 
    });
  }
};

// Get all Videos
exports.getAllvideo = async (req, res) => {
  try {
    const videos = await Video.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] } // Exclude timestamps if needed
    });
    res.status(200).json(videos);
  } catch (err) {
    console.error("Error fetching videos:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get a single Video by ID
exports.getvideoById = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (!video) return res.status(404).json({ error: "Video not found" });
    res.status(200).json(video);
  } catch (err) {
    console.error("Error fetching video:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get Videos by Name (case-insensitive search)
exports.getvideoByName = async (req, res) => {
  try {
    const videoName = req.params.video_name.trim(); // Trim spaces from video name
    if (!videoName) {
      return res.status(400).json({ error: "Video name is required" });
    }

    const videos = await Video.findAll({
      where: {
        video_name: {
          [Op.iLike]: `%${videoName}%` // Case-insensitive search
        }
      },
      attributes: ["video_id", "video_name", "thumbnail_url", "youtube_link"] // Updated to thumbnail_url
    });

    if (videos.length === 0) {
      return res.status(404).json({ error: "No videos found" });
    }

    res.status(200).json(videos);
  } catch (err) {
    console.error("Error fetching videos:", err);
    res.status(500).json({ error: err.message });
  }
};

// Delete a Video by ID
exports.deletevideo = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (!video) return res.status(404).json({ error: "Video not found" });

    await video.destroy();
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (err) {
    console.error("Error deleting video:", err);
    res.status(500).json({ error: err.message });
  }
};