import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./LeftSidebar";
import Topbar from "./Topbar";
import "./css/HomeStudent.css";
import axios from "axios";

function HomeStudent() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getPlayLists")
      .then((result) => {
        setPlaylists(result.data);
      })
      .catch((err) => {
        console.log("Error fetching playlists:", err);
      });
  }, []);

  return (
    <div className="home-layout">
      <Sidebar />
      <div className="main-section">
        <Topbar />
        <div className="home-content">
          <h1>Welcome {username}, you are a {role}</h1>
          <p>Explore available courses created by different teachers and start learning now!</p>
        </div>

        <div className="playlist-wrapper">
          <div className="playlist-grid">
            {playlists.map((playlist, index) => (
              <div className="playlist-card" key={index}>
                <div className="upper-playlist">
                  <h1 className="username">
                    {playlist.username[0].toUpperCase() + playlist.username.slice(1)}
                  </h1>
                  <div className="tumbnail-img-display">
                    <img
                      src={`http://localhost:3001${playlist.PlayListImage}`}
                      alt="thumbnail"
                    />
                  </div>
                </div>
                <div className="lower-playlist">
                  <div className="playlist-tittle">{playlist.PlayListName}</div>
                  <div className="playlist-description">{playlist.PlayListDescription}</div>

                  {/* ✅ Created by line below description */}
                  <div className="playlist-created-by">
                    Created by: <strong>{playlist.username}</strong>
                  </div>

                  <div className="playlist-actions">
                  <button
                  className="view-btn"
                  onClick={() => navigate(`/ViewPlayListStudent/${playlist._id}`)}
                  >
                  ▶ View
                </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default HomeStudent;
