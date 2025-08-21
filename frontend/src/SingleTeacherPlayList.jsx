import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "./LeftSidebar";
import Topbar from "./Topbar"; 
import "./css/SingleTeacherPlayList.css"

function SingleTeacherPlayList() {
  const { username } = useParams();
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/getPlaylistsByTeacher/${username}`)
      .then((res) => setPlaylists(res.data))
      .catch((err) => console.log("Error fetching playlists:", err));
  }, [username]);

  return (
    <div className="home-layout">
      <Sidebar />
      <div className="main-section">
        <Topbar />

        <div className="home-content">
          <h1>Playlists by {username}</h1>
        </div>

        <div className="playlist-grid">
          {playlists.map((playlist, index) => (
            <div className="playlist-card" key={index}>
              <div className="upper-playlist">
                <h1 className="username">{playlist.username}</h1>
                <div className="tumbnail-img-display">
                  <img src={`http://localhost:3001${playlist.PlayListImage}`} alt="thumbnail" />
                </div>
              </div>
              <div className="lower-playlist">
                <div className="playlist-tittle">{playlist.PlayListName}</div>
                <div className="playlist-description">{playlist.PlayListDescription}</div>
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
  );
}

export default SingleTeacherPlayList;
