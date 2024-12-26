import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('Uploading file...');
      const response = await axios.post('http://localhost:8080/api/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Upload successful:', response.data);
      alert('File uploaded successfully');
    } catch (err) {
      console.error('Upload error:', err.response || err);
      alert(`Error uploading file: ${err.message}`);
    }
  };

  return (
    <div className="upload-container">
      <h2 className="text-center">Upload a File</h2>
      <form onSubmit={handleUpload} className="upload-form">
        <div className="form-group">
          <label htmlFor="file-input" className="form-label">Choose a File</label>
          <input
            id="file-input"
            type="file"
            className="form-control"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Upload</button>
      </form>
    </div>
  );
};

export default FileUpload;
