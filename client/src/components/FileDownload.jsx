import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileDownload = () => {
  const [files, setFiles] = useState([]); // State to store the list of files
  const [selectedFile, setSelectedFile] = useState(''); // State to store the selected file

  // Fetch all files from the server when the component loads
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/files'); // Fetch all files
        console.log("Fetched Files:", response.data); // Debug fetched files
        setFiles(response.data); // Set the file data
      } catch (error) {
        console.error('Error fetching files:', error);
        alert('Failed to load files.');
      }
    };

    fetchFiles();
  }, []);

  // Handle file download
  const handleDownload = async () => {
    try {
      if (!selectedFile) {
        alert("Please select a file to download");
        return;
      }

      console.log("Selected File ID:", selectedFile);
      const file = files.find((f) => f._id === selectedFile);
      if (!file) {
        alert("File not found");
        return;
      }

      console.log("File Metadata:", file);

      // Send GET request to download the file
      const response = await axios.get(`http://localhost:8080/api/files/${file._id}`, {
        responseType: 'blob', // Ensures the file is treated as binary data
      });

      console.log("Download Response:", response);

      // Create a temporary link to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.originalName); // Set file name for download
      document.body.appendChild(link);
      link.click();
      link.remove();

      alert("File downloaded successfully");
    } catch (error) {
      console.error("Error downloading file:", error.response || error);
      alert("Failed to download file. Please try again.");
    }
  };

  return (
    <div className="download-container">
      <h2 className="text-center">Download a File</h2>
      <div className="form-group">
        <label htmlFor="file-select" className="form-label">Select a File</label>
        <select
          id="file-select"
          className="form-select"
          value={selectedFile}
          onChange={(e) => setSelectedFile(e.target.value)}
        >
          <option value="">-- Select a file --</option>
          {files.map((file) => (
            <option key={file._id} value={file._id}>
              {file.originalName}
            </option>
          ))}
        </select>
      </div>
      <button
        className="btn btn-primary mt-3"
        onClick={handleDownload}
        disabled={!selectedFile}
      >
        Download
      </button>
    </div>
  );
};

export default FileDownload;
