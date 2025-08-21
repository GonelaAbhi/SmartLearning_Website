import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/ViewProfile.css';

function ViewProfile() {
  const [user, setUser] = useState(null);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/getProfile/${username}`)
      .then((res) => setUser(res.data.user))
      .catch((err) => console.error("Error fetching profile", err));
  }, [username]);

  if (!user) {
    return <div className="loading-text">Loading profile...</div>;
  }

  const role = localStorage.getItem('role');

  const handleBack = (e) =>{
    e.preventDefault();
    if(role == 'teacher'){
      navigate('/HomeTeachers')
    }
    if(role == 'student'){
      navigate('/HomeStudent');
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={`http://localhost:3001${user.profilePic}`}
          alt="Profile"
          className="profile-img"
        />
        <h2>{user.name || username}</h2>
        <p className="email">{user.email}</p>
        <p className="role">{user.role}</p>

        <div className="button-group">
          <button onClick={() => navigate('/EditProfile')} className="btn edit">✏️ Edit Profile</button>
          <button onClick={() => navigate('/EditProfile')} className="btn password">🔒 Change Password</button>
          <button onClick={handleBack} className="btn back">⬅️ Back to Home</button>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
