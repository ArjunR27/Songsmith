import { useState, useEffect } from "react";
import "./EditPlaylist.css"; 
import PropTypes from "prop-types";

function EditPlaylist({ playlist, onClose, onUpdate }) {
  const [playlistTitle, setPlaylistTitle] = useState(playlist.playlist_name);
  const [playlistDescription, setPlaylistDescription] = useState(playlist.description);
  const [playlistCoverURL, setPlaylistCoverURL] = useState(playlist.cover);
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    setPlaylistTitle(playlist.playlist_name);
    setPlaylistDescription(playlist.description);
    setPlaylistCoverURL(playlist.cover);
  }, [playlist]);

  const handleTitleChange = (event) => {
    setPlaylistTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setPlaylistDescription(event.target.value);
  };

  const handleCoverURLChange = (event) => {
    setPlaylistCoverURL(event.target.value);
  };

  const handleSubmit = () => {
    fetch('http://localhost:8000/playlists/' + path, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playlist_name: playlistTitle,
        description: playlistDescription,
        cover: playlistCoverURL,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Playlist updated successfully:", data);
        onUpdate(data["playlist"]); 
        onClose(); // Close the popup after saving changes
      })
      .catch((error) => {
        console.error("Error updating playlist:", error.message);
      });
  };

  return (
    <div className="edit-popup">
      <div className="edit-popup-content">
        <h2>Edit playlist</h2>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={playlistTitle}
          onChange={handleTitleChange}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={playlistDescription}
          onChange={handleDescriptionChange}
        ></textarea>
        <label htmlFor="coverURL">Cover Image URL:</label>
        <input
          type="text"
          id="coverURL"
          value={playlistCoverURL}
          onChange={handleCoverURLChange}
        />

        <div className="edit-popup-buttons">
          <button onClick={handleSubmit} className="pl-save-button">Save</button>
          <button onClick={onClose} className="pl-cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
}

EditPlaylist.propTypes = {
  playlist: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    playlist_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired, // Add this line
};

export default EditPlaylist;
