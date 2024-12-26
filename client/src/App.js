import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import FileDownload from './components/FileDownload';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Custom styles for the color scheme

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar navbar-expand-lg custom-navbar w-100">
          <div className="container-fluid">
            <Link className="navbar-brand custom-link" to="/">File Sharing App</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/upload">Upload File</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/files">View Files</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/download">Download File</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="entire-main">
          <div className="content">
            <Routes>
              <Route path="/" element={<h1 className="text-center custom-text">Welcome to the File Sharing App</h1>} />
              <Route path="/upload" element={<FileUpload />} />
              <Route path="/files" element={<FileList />} />
              <Route path="/download" element={<FileDownload />} />
            </Routes>
          </div>
        </main>

        <footer className="footer text-center py-3">
          <p className="mb-0">&copy; {new Date().getFullYear()} File Sharing App. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
