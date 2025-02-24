const multer = require('multer');
const path = require('path');

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Add timestamp to filename
  }
});

const upload = multer({ storage });

// Define route
app.post('/upload', upload.single('video'), (req, res) => {
  console.log(req.file);  // Log the file to check its structure
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const videoUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ message: 'Video uploaded successfully', videoUrl });
});
