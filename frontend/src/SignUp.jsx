import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./css/SignUp.css";
import { useEffect } from "react";


function SignUp() {


   useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
        navigate("/HomeStudent");
    }
    }, []);



  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [role,setRole] = useState('student');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("profilePic", profilePic);

    axios.post("http://localhost:3001/SignUp", formData)
      .then(result => {
        setMessage(result.data.message);
        if (result.data.message === 'User already exists') {
          setMessage(result.data.message);
        } else {
          alert(result.data.message);
          navigate('/');
        }
      })
      .catch(error => console.log(error));

  }



  return (
    
    <div className="signup-container">
        <h2>{role === "student" ? "Student" : "Teacher"} Sign Up</h2>

        <div className="role-buttons">
        <button
          type="button"
          className={role === "student" ? "active" : ""}
          onClick={() => setRole("student")}
        >
          Student
        </button>
        <button
          type="button"
          className={role === "teacher" ? "active" : ""}
          onClick={() => setRole("teacher")}
        >
          Teacher
        </button>
      </div>
       <p style={{ color: 'red', fontWeight: 'bold' }}>{message}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username} onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={email} onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password} onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input type="file" accept="image/*" onChange={(e) => setProfilePic(e.target.files[0])}  />

        <button type="submit">Sign Up</button>

        <p className="signup-text">
          I have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
