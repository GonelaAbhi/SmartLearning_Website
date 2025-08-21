import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "./LeftSidebar";
import Topbar from "./Topbar";
import "./css/ViewPlayListStudent.css";

function ViewPlayListStudent() {
  const { id } = useParams(); // Playlist ID from URL
  const [playlist, setPlaylist] = useState(null);
  const [videos, setVideos] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [commentInput, setCommentInput] = useState({});
  const username = localStorage.getItem("username");

  useEffect(() => {
    // Fetch playlist details
    axios
      .get(`http://localhost:3001/GetPlayListById/${id}`)
      .then((res) => {
        setPlaylist(res.data);
      })
      .catch((err) => console.error("Error fetching playlist:", err));

    // Fetch videos in playlist
    axios.get(`http://localhost:3001/getPlaylistByIdVideos/${id}`)
      .then((res) => {
        setVideos(res.data);

        // Initialize state from server data
        const initialLikes = {};
        const initialComments = {};
        const initialInputs = {};
        res.data.forEach((video) => {
          initialLikes[video._id] = video.likes || 0;
          initialComments[video._id] = video.comments || [];
          initialInputs[video._id] = "";
        });
        setLikes(initialLikes);
        setComments(initialComments);
        setCommentInput(initialInputs);
      })
      .catch((err) => console.error("Error fetching videos:", err));
  }, [id]);

  // Handle like button click
  const handleLike = (videoId) => {
    axios.put(`http://localhost:3001/videos/like/${videoId}`, { username })
      .then((res) => {
        setLikes((prev) => ({
          ...prev,
          [videoId]: res.data.likes, // updated likes from backend
        }));
      })
      .catch((err) => console.error("Error liking video:", err));
  };

  // Handle comment submit (backend sync)
  const handleCommentSubmit = (videoId) => {
    if (!commentInput[videoId] || commentInput[videoId].trim() === "") return;

    axios.put(`http://localhost:3001/videos/comment/${videoId}`, {
        username,
        text: commentInput[videoId],
      })
      .then((res) => {
        setComments((prev) => ({
          ...prev,
          [videoId]: res.data.comments,
        }));
        setCommentInput((prev) => ({
          ...prev,
          [videoId]: "",
        }));
      })
      .catch((err) => console.error("Error adding comment:", err));
  };

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-layout">
      <Sidebar />
      <div className="main-section">
        <Topbar />

        {/* Playlist Header */}
        <div className="playlist-header">
          <img
            src={`http://localhost:3001${playlist.PlayListImage}`}
            alt="Playlist Thumbnail"
            className="playlist-thumbnail"
          />
          <div className="playlist-info">
            <h1>{playlist.PlayListName}</h1>
            <p>{playlist.PlayListDescription}</p>
            <p className="playlist-creator">
              Created by: <strong>{playlist.username}</strong>
            </p>
          </div>
        </div>

        {/* Video List */}
        <div className="video-list">
          <h2>Videos in this course</h2>
          {videos.length > 0 ? (
            videos.map((video) => (
              <div className="video-card" key={video._id}>
                <h3>{video.videoTitle}</h3>
                <video controls width="100%">
                  <source
                    src={`http://localhost:3001${video.videoUrl}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <p>{video.videoDescription}</p>

                {/* Like Button */}
                <div className="video-actions">
                  <button onClick={() => handleLike(video._id)}>👍 Like</button>
                  <span>{likes[video._id]} likes</span>
                </div>

                {/* Comment Section */}
                <div className="comment-section">
                  <h4>Comments</h4>
                  <ul>
                    {comments[video._id]?.map((c, i) => (
                      <li key={i}>
                        <strong>{c.username}:</strong> {c.text}
                      </li>
                    ))}
                  </ul>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentInput[video._id] || ""}
                    onChange={(e) =>
                      setCommentInput((prev) => ({
                        ...prev,
                        [video._id]: e.target.value,
                      }))
                    }
                  />
                  <button onClick={() => handleCommentSubmit(video._id)}>
                    Post
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No videos found for this playlist.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewPlayListStudent;
