import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SideBarTeachers from "./SideBarTeachers";
import Topbar from "./Topbar";
import ReactPlayer from "react-player";
import "./css/ViewPlayList.css";

function ViewPlayList() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/getPlaylistById/${id}`)
      .then((res) => setPlaylist(res.data))
      .catch((err) => console.error("Error loading playlist:", err));

    axios.get(`http://localhost:3001/getPlaylistByIdVideos/${id}`)
      .then((res) => setVideos(res.data))
      .catch((err) => console.error("Error loading videos:", err));
  }, [id]);

  if (!playlist) {
    return <div className="loading">Loading playlist...</div>;
  }

  return (
    <div className="view-layout">
      <SideBarTeachers />
      <div className="main-section">
        <Topbar />

        <div className="playlist-details">
          <h1>{playlist.PlayListName}</h1>
          <p>{playlist.PlayListDescription}</p>
          <div className="created-by">Created by: {playlist.username}</div>

          <button
            className="upload-btn"
            onClick={() => navigate("UploadVideo")}
          >
            📤 Upload Video
          </button>
        </div>
<div className="video-list">
  {videos.length > 0 ? (
    videos.map((video, index) => (
      <div className="video-card" key={index}>
        <video controls width="100%" height="100%">
          <source
            src={`http://localhost:3001${video.videoUrl}`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <h3>{video.videoTitle}</h3>
        <p>{video.videoDescription}</p>
      </div>
    ))
  ) : (
    <p className="no-videos">No videos available in this playlist.</p>
  )}
</div>

      </div>
    </div>
  );
}

export default ViewPlayList;
