# File Sharing App

A simple and intuitive file-sharing application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This app allows users to upload files, view a list of uploaded files, and download them with a clean and modern UI.

## Features

- **File Upload**: Upload files directly from your device.
- **File Listing**: View all uploaded files in a table with metadata (e.g., file name, size).
- **File Download**: Download files with a single click.
- **Modern UI**: Glassmorphism-inspired design for an aesthetically pleasing interface.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

---

## Tech Stack

- **Frontend**: React.js, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

---

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/try/download/community) (local or cloud)
- npm (comes with Node.js)

---

## Getting Started

Follow these instructions to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/file-sharing-app.git
cd file-sharing-app
```

### 2. Install Dependencies
#### Backend
```
cd backend
npm install
```

#### Frontend
```
cd frontend
npm install
```

### 3. Configure Environment Variables
#### Backend
Create a .env file in the backend directory with the following variables:
```
PORT=8080
MONGO_URI=mongodb://127.0.0.1:27017/mydatabase
```
Replace mydatabase with your desired MongoDB database name.

### 4. Run the Application
Start MongoDB
Ensure your MongoDB server is running locally or provide a remote connection string.

Start Backend

```
cd backend
npm start
```
Start Frontend

```
cd frontend
npm start
```
The backend will run on http://localhost:8080 and the frontend will run on http://localhost:3000.

---

## Folder Structure
```
file-sharing-app/
├── backend/                 # Backend code
│   ├── controllers/         # Route controllers for APIs
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── server.js            # Entry point for the backend
│   └── .env                 # Environment variables
├── frontend/                # Frontend code
│   ├── src/
│   │   ├── components/      # React components (FileUpload, FileList, etc.)
│   │   ├── App.js           # Main App component
│   │   ├── index.js         # Entry point for React
│   │   └── styles.css       # Custom styles
└── README.md                # Project documentation

```

---

## API Endpoints
### File Upload
- URL: POST /api/files/upload
- Description: Uploads a file to the server and saves its metadata to the database.
- Request: multipart/form-data with a file field.

### File List
- URL: GET /api/files
- Description: Retrieves a list of all uploaded files.

### File Download
- URL: GET /api/files/:id
- Description: Downloads a file by its ID.

### Future Improvements
- Add user authentication for secure file sharing.
- Enable file previews for certain file types (e.g., images, PDFs).
- Integrate cloud storage (e.g., AWS S3) for uploaded files.
