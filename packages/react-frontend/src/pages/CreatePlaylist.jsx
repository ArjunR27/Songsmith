import React, { useState } from "react";
import "./CreatePlaylist.css";

function CreatePlaylist() {
  const [playlistData, setPlaylistData] = useState({
    name: "",
    description: "",
    coverImage: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPlaylistData({
      ...playlistData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPlaylistData({
      ...playlistData,
      coverImage: file,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted data:", playlistData);
  };

  return (
    <div className="create-playlist">
      <h2>Create Playlist</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Playlist Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={playlistData.name}
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
          <label htmlFor="coverImage">Playlist Cover</label>
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Create Playlist</button>
      </form>
    </div>
  );
}

export default CreatePlaylist;
