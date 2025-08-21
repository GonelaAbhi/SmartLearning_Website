import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/LeftSidebar.css';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

function SidebarTeachers() {
    const [user,setUserData] = useState({});
    const username = localStorage.getItem("username") || "User";
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    // if(role == 'teacher'){
    //   navigate('SidebarTeachers');
    // }

  useEffect(() => {
    axios.get(`http://localhost:3001/getProfile/${username}`)
      .then((result) => {
        setUserData(result.data.user);
      // console.log(result.data.user.profilePic);
      })
      .catch((error) => {
      console.log("Error fetching profile:", error);
    });
}, [username]);

  return (
    <div className="sidebar">
      <div className="profile-section">
        <img
          src={`http://localhost:3001${user.profilePic}`}
          alt="Profile"
          className="profile-pic"
        />
        <h3>{username}</h3>
        <Link className="view-profile" to="/ViewProfile">View Profile</Link>
        
      </div>
      <nav className="nav-links">
        <Link to="/HomeTeachers">🏠 Home</Link>
        <Link to="/TeacherPlayList">📺 Playlists</Link>
        <Link to="/quizzes">❓ Quizzes</Link>
      </nav>
    </div>
  );
}

export default SidebarTeachers;
