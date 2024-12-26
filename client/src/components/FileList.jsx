import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/files/');
        setFiles(response.data);
      } catch (error) {
        console.error('Failed to fetch files:', error);
      }
    };
    fetchFiles();
  }, []);

  return (
    <div className="glass-container">
      <h2 className="text-center">Uploaded Files</h2>
      {files.length === 0 ? (
        <p className="text-warning text-center">No files available.</p>
      ) : (
        <table className="table table-bordered table-hover text-light">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">File Name</th>
              <th scope="col">Size (KB)</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={file._id}>
                <td>{index + 1}</td>
                <td>{file.originalName}</td>
                <td>{Math.round(file.size / 1024)}</td>
                <td>
                  <a
                    href={`http://localhost:8080/api/files/${file._id}`}
                    download
                    className="btn btn-primary btn-sm"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FileList;
