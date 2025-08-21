import React from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import "./css/HomeTeachers.css"; 
import SideBarTeachers from "./SideBarTeachers";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function HomeTeachers() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const [playlists, setPlaylists] = useState([]);
  const role = localStorage.getItem('role');

useEffect(() => {
  if (role !== 'teacher') {
    navigate('/'); // or your login page
  }
}, [role, navigate]);


    useEffect(()=>{
      axios.get(`http://localhost:3001/GetPlayList/${username}`)
      .then((result)=>{console.log(result)
                 setPlaylists(result.data)     
                })
      .catch((err) => {console.log("error for fetching")});
  },[username])



  return (
    <div className="home-layout">
          <SideBarTeachers />
          <div className="main-section">
            <Topbar />
            <div className="home-content">
              <h1>Welcome back, {username} 👋</h1>
                <p>Manage your playlists, view your uploaded content, and create new courses easily.Add QUIZS</p>
            </div>


      <div className="playlist-wrapper">
        <div className="playlist-grid">
        {playlists.map((playlist, index) => (
          <div className="playlist-card" key={index}>
            <div className='upper-playlist'>  
              <h1 className='username'>{username[0].toUpperCase() + username.slice(1)}</h1>
              <div className='tumbnail-img-display'>
                <img src={`http://localhost:3001${playlist.PlayListImage}`} alt="thumbnail" />
              </div>
            </div>
            <div className='lower-playlist'>
                <div className='playlist-tittle'>{playlist.PlayListName}</div>
                <div className='playlist-description'>{playlist.PlayListDescription}</div>
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

  </div>

  );
}

export default HomeTeachers;
