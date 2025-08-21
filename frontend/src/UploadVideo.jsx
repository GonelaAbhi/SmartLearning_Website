import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./css/UploadVideo.css"; // import CSS file

function UploadVideo() {
  const { id } = useParams();
  const [videoFile, setVideoFile] = useState(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const navigate = useNavigate();

  const handleUpload =  (e) => {
    e.preventDefault();
    if (!videoFile) {
      alert("Please select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("videoUrl", videoFile);
    formData.append("playlistId", id);
    formData.append("videoTitle", videoTitle);
    formData.append("videoDescription", videoDescription);

    
       axios.post("http://localhost:3001/uploadVideo", formData)
      .then((res) => {alert(res.data.message)
            setVideoFile(null);
            setVideoTitle("");
            setVideoDescription("");
            navigate(`/ViewPlayList/${id}`);})
    .catch( (err) =>{
      console.error("Error uploading video:", err);
      alert("Failed to upload video.");    
    })

    
  };

  return (
    <div className="upload-video-container">
      <h2>Upload Video</h2>
      <form onSubmit={handleUpload} className="upload-video-form">
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="Video Title"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
        />
        <textarea
          placeholder="Video Description"
          value={videoDescription}
          onChange={(e) => setVideoDescription(e.target.value)}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadVideo;
