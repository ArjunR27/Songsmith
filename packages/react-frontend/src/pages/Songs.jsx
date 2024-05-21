import React, { useState, useEffect } from "react";
import Table from "./SongsTable.jsx";
import "./Songs.css";
import { useNavigate } from "react-router-dom";

function Songs() {
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();
  // FETCH Users
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/songs");

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
    navigate("/addSong"); // Change '/different-page' to the actual path you want to navigate to
  };

  return (
    <>
      
      <div className="table-container">
        <Table songData={songs} handleButtonClick={handleButtonClick}/>
      </div>
    </>
  );
}

export default Songs;
