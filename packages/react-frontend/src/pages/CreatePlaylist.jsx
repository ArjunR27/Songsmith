import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CreatePlaylist.css";

function CreatePlaylist() {
  const [playlistData, setPlaylistData] = useState({
    playlist_name: "",
    description: "",
    cover: "",
  });
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPlaylistData({
      ...playlistData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(playlistData);

    fetch(`http://localhost:8000/playlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playlistData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add playlist");
        }
        return response.json();
      })
      .then(() => {
        // After successful creation, navigate to /playlists
        window.location.href = "/playlists";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="page">
      <h1 className="cp-header">Create Playlist</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Playlist Name</label>
          <input
            type="text"
            id="playlist_name"
            name="playlist_name"
            value={playlistData.playlist_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={playlistData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="coverImage">Cover URL </label>
          <input
            type="text"
            id="cover"
            name="cover"
            value={playlistData.cover}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Create Playlist</button>
      </form>
    </div>
  );
}

export default CreatePlaylist;
