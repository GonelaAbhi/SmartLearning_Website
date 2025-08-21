import React from 'react';
import './css/Topbar.css';
import { useNavigate } from 'react-router-dom';

function Topbar() {

const navigate = useNavigate();
const LogOut = () => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate('/');
  };
  return (
    <div className="topbar">
      <h2>Smart Lerning website</h2>

      <input
        type="text"
        placeholder="Search..."
        className="search-input"
      />
      <button onClick={LogOut}>LogOut</button>
    </div>
  );
}

export default Topbar;