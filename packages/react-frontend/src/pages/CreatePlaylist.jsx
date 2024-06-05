import { useState } from "react";
import PropTypes from 'prop-types';
import "./CreatePlaylist.css";

function CreatePlaylist({ userId }) {
  const [playlistData, setPlaylistData] = useState({
    playlist_name: "",
    description: "",
    cover: "",
    author: userId,
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
    console.log(userId);

    fetch("https://songsmith.azurewebsites.net/playlists", {
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
          <label htmlFor="playlist_name">Playlist Name</label>
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
          <label htmlFor="cover">Cover URL</label>
          <input
            type="text"
            id="cover"
            name="cover"
            value={playlistData.cover}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Create Playlist</button>
      </form>
    </div>
  );
}

CreatePlaylist.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default CreatePlaylist;
