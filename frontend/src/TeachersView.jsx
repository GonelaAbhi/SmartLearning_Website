import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./LeftSidebar";
import Topbar from "./Topbar"; 
import "./css/TeachersView.css";
import { useNavigate } from "react-router-dom";

function TeacherView() {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/getAllTeachers")
      .then((res) => {
        setTeachers(res.data);
      })
      .catch((err) => {
        console.log("Error fetching teachers:", err);
      });
  }, []);

  const goToTeacherPlaylists = (username) => {
    navigate(`/SingleTeacherPlayList/${username}`);
  };

  return (
    <div className="home-layout">
      <Sidebar />
      <div className="main-section">
        <Topbar />

        <div className="home-content">
          <h1>All Teachers</h1>
          <p>Click on a teacher's name or profile photo to view their playlists.</p>
        </div>

        <div className="teacher-grid">
          {teachers.map((teacher, idx) => (
            <div className="teacher-card" key={idx}>
              <div className="teacher-photo" onClick={() => goToTeacherPlaylists(teacher.username)}>
                <img
                  src={`http://localhost:3001${teacher.profilePic}`}
                  alt={`${teacher.username}'s profile`}
                />
              </div>
              <div className="teacher-info">
                <h2 onClick={() => goToTeacherPlaylists(teacher.username)}>{teacher.username}</h2>
                <p>Email: {teacher.email}</p>
                <p>Role: {teacher.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeacherView;
