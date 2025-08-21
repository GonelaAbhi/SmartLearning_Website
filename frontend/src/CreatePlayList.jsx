import React, { useState } from 'react';
import './css/CreatePlayList.css';
import { data } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePlayList() {
  const username = localStorage.getItem("username");
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tumbnail,setTumbnail]= useState(null);
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("PlayListName", title);
    formData.append("PlayListDescription", description);
    formData.append("PlayListImage", tumbnail);

    console.log(formData);
    axios.post("http://localhost:3001/CreatePlayList",formData)
    .then(result => {if(result.data.message == "created sucessfully"){
      alert("Playlist created successfully");
      navigate('/TeacherPlayList');

    }})
    .catch(err => {console.log(err)});

    
  };

  return (
    <div className="create-playlist-container">
      <h2>Create New Playlist</h2>
      <form onSubmit={handleSubmit} className="create-playlist-form">
        <label>
          Playlist Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
          ></textarea>
        </label>


        <label>
            Upload Thumbnail:
            <input
            type="file"
            accept="image/*"
            onChange={(e) => { setTumbnail(e.target.files[0])}}
          />
        </label>

        <button type="submit">Create Playlist</button>
      </form>
    </div>
  );
}


export default CreatePlayList
