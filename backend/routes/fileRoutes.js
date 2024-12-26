const express = require('express');
const { uploadFile, getFiles, downloadFile } = require('../controllers/fileController');
const upload = require('../middleware /multerConfig.js'); // Import the multer middleware
// ../middleware /multerConfig.js

const router = express.Router();

// Route to upload a file
router.post('/upload', upload.single('file'), uploadFile);

// Route to get all files
router.get('/', getFiles);

// // Route to download a file
router.get('/:id', downloadFile);

module.exports = router;
