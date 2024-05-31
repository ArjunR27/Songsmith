import { useState, useEffect } from "react";
import Table from "../components/SongsTable.jsx";
import "./Songs.css";
import { useNavigate } from "react-router-dom";

function Songs() {
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();
  // FETCH Users
  function fetchUsers() {
    const promise = fetch("https://songsmith.azurewebsites.net/songs");

    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setSongs(json["song_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleButtonClick = () => {
    navigate("/createSong"); // Change '/different-page' to the actual path you want to navigate to
  };

  return (
    <>
      <div className="page">
        <div className = "header-container">
        <h1 className="song-header">Songs</h1>
    
          </div>
          <button onClick={handleButtonClick} className="navigate-button">
            Add Song
          </button>
        <div className="table-container">
          <Table songData={songs} />
        </div>
      </div>
      
    </>
  );
}

export default Songs;
