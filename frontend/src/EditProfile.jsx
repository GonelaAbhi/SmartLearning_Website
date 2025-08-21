import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './css/EditProfile.css';

function EditProfile() {
  const username = localStorage.getItem("username");
  const [userData, setUserData] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  // Fetch user data from database
  useEffect(() => {
    axios.get(`http://localhost:3001/getProfile/${username}`)
      .then((result) => {
        setUserData(result.data.user);
        setEmail(result.data.user.email || '');
      })
      .catch((error) => {
        console.log("Error fetching profile:", error);
      });
  }, [username]);

  // Handle profile update
  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    axios.put(`http://localhost:3001/updateProfile/${username}`, formData)
      .then((res) => {
        alert(res.data.message);
        navigate('/ViewProfile');
      })
      .catch((err) => {
        console.log("Error updating profile:", err);
      });
  }

  return (
    <div className="editProfile-container">
      <h2>Edit Profile</h2>

      <form onSubmit={handleUpdate}>
        <label>Email Address</label>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
              required
        />
        <label >New Password (Leave Blank if no need )</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {userData.profilePic && (
          <>
            <label>Current Profile Picture</label>
            <div style={{ marginBottom: '10px' }}>
              <img
                src={`http://localhost:3001${userData.profilePic}`}
                alt="Current Profile"
                style={{ width: "100px", borderRadius: "10px" }}
              />
            </div>
          </>
        )}

        <label>Upload New Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfilePic(e.target.files[0])}
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default EditProfile;
