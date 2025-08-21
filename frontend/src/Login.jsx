import React from "react";
import { Link } from "react-router-dom";
import "./css/Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";


function Login() {

  const [username,setusername] = useState("");
    const [password,setPassword] = useState("");
    const [message , setMessage] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
       if (localStorage.getItem("isLoggedIn") === "true") {
        const role = localStorage.getItem('role');
        if(role === "student")
        navigate("/HomeStudent");

        if(role == "teacher"){
          navigate('/HomeTeachers')
        }
    }
    }, []);
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:3001/Login',{username , password})
        .then( result => {
            setMessage(result.data.message)
            if(result.data.success){
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("username",result.data.user)
                localStorage.setItem("role",result.data.role)
              if(result.data.role === "student"){
                 navigate('/HomeStudent')
              }
              if(result.data.role === "teacher"){
                 navigate('/HomeTeachers')
              }
            }
        })
        .catch( error => {console.log(error)})
    }
  return (
    <div className="login-container">
      <p style={{ color: 'red', fontWeight: 'bold' }}>{message}</p>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="User Name"  value={username} onChange={(e) => setusername(e.target.value)} required/>
        <input type="password" placeholder="Password" value={password}  onChange={(e) => setPassword(e.target.value)} required/>
        <button type="submit">Login</button>
      </form>

      <p className="signup-text">
        Don't have an account? <Link to={"/SignUp"}>Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
