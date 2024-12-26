const fs = require('fs');
const path = require('path');
const File = require('../models/File');


// Helper function to log messages to a file
const logToFile = (message) => {
  const logFilePath = path.resolve(__dirname, '../server.log'); // Ensure absolute path
  const logMessage = `${new Date().toISOString()} - ${message}\n`;
  
  try {
    // Write to the log file, create it if it doesn't exist
    fs.appendFileSync(logFilePath, logMessage, 'utf8');
  } catch (err) {
    console.error("Failed to write to log file:", err);
  }
};

logToFile("Test log entry to verify log file creation");

// Upload a file and save metadata to the database
const uploadFile = async (req, res) => {
  try {
    // Validate file upload
    if (!req.file) {
      const errorMessage = "No file uploaded";
      logToFile(errorMessage);
      return res.status(400).json({ message: errorMessage });
    }

    // Save file metadata to the database
    const file = new File({
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      path: req.file.path,
    });
    await file.save();

    const successMessage = "File uploaded successfully";
    logToFile(`${successMessage}: ${JSON.stringify(file)}`);
    res.status(201).json({
      message: successMessage,
      file,
    });
  } catch (error) {
    const errorMessage = `Failed to upload file: ${error.message}`;
    logToFile(errorMessage);
    res.status(500).json({ error: errorMessage, details: error.message });
  }
};

// Get a list of all uploaded files
const getFiles = async (req, res) => {
  console.log('Trying the getFiles function.')
  try {
    const files = await File.find();

    if (files.length === 0) {
      const errorMessage = "No files found";
      logToFile(errorMessage);
      return res.status(404).json({ message: errorMessage });
    }

    logToFile(`Retrieved files: ${JSON.stringify(files)}`);
    res.status(200).json(files);
  } catch (error) {
    const errorMessage = `Failed to retrieve files: ${error.message}`;
    logToFile(errorMessage);
    res.status(500).json({ error: errorMessage, details: error.message });
  }
};

// Download a file by its ID
const downloadFile = async (req, res) => {
  logToFile(`Trying to download the file`);
  try {
    logToFile(`Requested File ID: ${req.params.id}`);

    const file = await File.findById(req.params.id);
    if (!file) {
      const errorMessage = `File not found for ID: ${req.params.id}`;
      logToFile(errorMessage);
      return res.status(404).json({ message: "File not found" });
    }

    const filePath = path.resolve(file.path);
    logToFile(`Resolved File Path: ${filePath}`);

    res.download(filePath, file.originalName, (err) => {
      if (err) {
        const errorMessage = `Error sending file: ${err.message}`;
        logToFile(errorMessage);
        res.status(500).json({ message: "Failed to download file" });
      }
    });
  } catch (error) {
    const errorMessage = `Error fetching file: ${error.message}`;
    logToFile(errorMessage);
    res.status(500).json({ message: "Internal server error", details: error.message });
  }
};

module.exports = { uploadFile, getFiles, downloadFile };
