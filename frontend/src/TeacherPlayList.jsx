import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Topbar from './Topbar';
import SideBarTeachers from './SideBarTeachers';
import './css/TeacherPlayList.css';

function TeacherPlayList() {
  const username = localStorage.getItem('username');
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/GetPlayList/${username}`)
      .then((result) => {
        setPlaylists(result.data);
      })
      .catch((err) => {
        console.log("Error fetching playlists:", err);
      });
  }, [username]);

  return (
    <div className="teacher-layout">
      <SideBarTeachers />
      
      <div className="main-section">
        <Topbar />

        <div className="playlist-header">
          <h1>{username?.toUpperCase()} Courses</h1>
          <Link className="create-btn" to="/CreatePlayList">
            ➕ Create Playlist
          </Link>
        </div>

        <div className="playlist-grid">
          {playlists.map((playlist, index) => (
            <div className="playlist-card" key={index}>
              <div className="upper-playlist">
                <h1 className="username">
                  {username[0].toUpperCase() + username.slice(1)}
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
                <div className="playlist-description">
                  {playlist.PlayListDescription}
                </div>

                <div className="playlist-created-by">
                  Created by: <strong>{playlist.username}</strong>
                </div>

                <div className="playlist-actions">
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/ViewPlayList/${playlist._id}`)}
                  >
                    ▶ View
                  </button>
                  <button className="edit-btn">✏️ Edit</button>
                  <button className="delete-btn">🗑️ Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeacherPlayList;
