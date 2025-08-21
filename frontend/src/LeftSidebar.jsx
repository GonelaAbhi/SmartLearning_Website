  import React from 'react';
  import { Link } from 'react-router-dom';
  import './css/LeftSidebar.css';
  import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

  function Sidebar() {
    const [user,setUserData] = useState({});
    const username = localStorage.getItem("username") || "User";

 useEffect(() => {
  axios.get(`http://localhost:3001/getProfile/${username}`)
    .then((result) => {
      setUserData(result.data.user);
    })
    .catch((error) => {
      console.log("Error fetching profile:", error);
    });
}, [username]);


    return (
      <div className="sidebar">
        <div className="profile-section">
          <img src={`http://localhost:3001${user.profilePic}`} alt="Profile" className="profile-pic" />
          <h3>{username} </h3>
          <Link className="view-profile" to="/ViewProfile">View Profile</Link>
        </div>
        <nav className="nav-links">
          <Link to="/HomeStudent">🏠 Home</Link>
          <Link to="/StudentCourses">📚 Courses</Link>
          <Link to="/TeacherView">👩‍🏫 Teachers</Link>
        </nav>
      </div>
    );
  }

  export default Sidebar;