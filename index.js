  // const express = require('express');
  // const cors = require('cors');
  // const bodyParser = require('body-parser');
  // const bcrypt = require('bcryptjs');
  // const fs = require('fs');
  // const User = require('./models/userModel');
  // // const Video = require('./models/video');
  // const sequelize = require('./database/db');
  // require('dotenv').config();
  // const videoRoutes = require('./routes/videoRoutes');

  // const app = express();
  // const PORT = process.env.PORT || 5000;

  // // Middleware
  // app.use(cors());
  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: true }));

  // // Routes
  // app.post('/users/login', async (req, res) => {
  //   const { name, password } = req.body;
  // //   // Validate credentials
  // //   if (name === 'user' && password === 'password') {
  // //     res.json({ token: 'your-jwt-token-here' }); // Return JSON
  // //   } else {
  // //     res.status(401).json({ message: 'Invalid credentials' }); // Return JSON
  // //   }
  // // });
  //   try {
  //   // Find the user by name
  //     const user = await User.findOne({ where: { name } });
  //     if (!user) {
  //       return res.status(401).json({ message: 'Invalid credentials' });
  //     }

  //   // Compare the provided password with the hashed password in the database
  //     const isPasswordValid = await bcrypt.compare(password, user.password);
  //     if (!isPasswordValid) {
  //       return res.status(401).json({ message: 'Invalid credentials' });
  //     }

  //   // If credentials are valid, return a token or success message
  //     res.json({ token: 'your-jwt-token-here', message: 'Login successful' });
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     res.status(500).json({ message: 'Something went wrong' });
  //   }
  // });


  

  // // User Registration
  // app.post('/users/add', async (req, res) => {
  //   const { name, password, confirmPassword } = req.body;

  //   if (!name || !password || !confirmPassword) {
  //     return res.status(400).json({ success: false, message: "Please fill in all fields." });
  //   }

  //   if (password !== confirmPassword) {
  //     return res.status(400).json({ success: false, message: "Passwords do not match." });
  //   }

  //   if (password.length < 6) {
  //     return res.status(400).json({ success: false, message: "Password must be at least 6 characters." });
  //   }

  //   try {
  //     const existingUser = await User.findOne({ where: { name } });
  //     if (existingUser) {
  //       return res.status(400).json({ success: false, message: "User already exists" });
  //     }

  //     const hashedPassword = await bcrypt.hash(password, 10);
  //     const newUser = await User.create({ name, password: hashedPassword });
  //     res.status(201).json({ success: true, message: "Registration successful", data: newUser });
  //   } catch (error) {
  //     console.error('Registration error:', error);
  //     res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  //   }
  // });

  // // Video Upload and Add (No Multer, Using Video URL)
  // app.post('/upload', async (req, res) => {
  //   const { user_id, video_url, description } = req.body;

  //   if (!user_id || !video_url || !description) {
  //     return res.status(400).json({ error: "All fields are required" });
  //   }

  //   try {
  //     const newVideo = await Video.create({
  //       user_id,
  //       video_url,
  //       description
  //     });

  //     res.status(201).json({
  //       message: 'Video uploaded successfully',
  //       video: newVideo
  //     });
  //   } catch (error) {
  //     console.error('Video upload error:', error);
  //     res.status(500).json({ error: 'Internal server error', details: error.message });
  //   }
  // });

  // // Mount videoRoutes under /api/videos
  // app.use('/api/videos', videoRoutes);

  // // // Get Videos by User ID
  // // app.get('/videos/:userId', async (req, res) => {
  // //   const { userId } = req.params;

  // //   try {
  // //     const videos = await Video.findAll({
  // //       where: { user_id: userId },
  // //       include: [{ model: User, attributes: ['name'] }]
  // //     });
  // //     res.json(videos);
  // //   } catch (error) {
  // //     console.error('Fetch videos error:', error);
  // //     res.status(500).json({ success: false, message: "Server error", error: error.message });
  // //   }
  // // });

  // // Database Connection and Server Start
  // sequelize.authenticate()
  //   .then(() => {
  //     console.log('Sequelize connected to database');
  //     return sequelize.sync({ force: false });
  //   })
  //   .then(() => {
  //     app.listen(PORT, () => {
  //       console.log(`Server running on PORT ${PORT}`);
  //     });
  //   })
  //   .catch((err) => {
  //     console.error('Database connection or sync error:', err);
  //   });








const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const User = require('./models/userModel');
const Video = require('./models/video');
const sequelize = require('./database/db');
require('dotenv').config();
const videoRoutes = require('./routes/videoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Routes
app.post('/users/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ where: { name } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ token: 'your-jwt-token-here', message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// User Registration
app.post('/users/add', async (req, res) => {
  const { name, password, confirmPassword } = req.body;

  if (!name || !password || !confirmPassword) {
    return res.status(400).json({ success: false, message: "Please fill in all fields." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: "Passwords do not match." });
  }

  if (password.length < 6) {
    return res.status(400).json({ success: false, message: "Password must be at least 6 characters." });
  }

  try {
    const existingUser = await User.findOne({ where: { name } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, password: hashedPassword });
    res.status(201).json({ success: true, message: "Registration successful", data: newUser });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }
});

// Video Upload Route (Using Multer for File Uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('video'), async (req, res) => {
  const { user_id, description } = req.body;
  const video_url = req.file ? req.file.path : null;

  if (!user_id || !video_url || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newVideo = await Video.create({
      user_id,
      video_url,
      description,
    });

    res.status(201).json({
      message: 'Video uploaded successfully',
      video: newVideo,
    });
  } catch (error) {
    console.error('Video upload error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Mount videoRoutes under /api/videos
app.use('/api/videos', videoRoutes);

// Database Connection and Server Start
sequelize.authenticate()
  .then(() => {
    console.log('Sequelize connected to database');
    return sequelize.sync({ force: false });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection or sync error:', err);
  });
