import React from "react";
import "./AddSong.css";
import { useState } from "react";
import InputFields from "../components/inputFields";

function AddSong() {
  const [songInfo, setSongInfo] = useState({
    name: "",
    artist: "",
    album: "",
    duration: "",
    cover: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Song Info:", songInfo);
    // Perform additional actions with the song information, such as sending it to a server
  };

  return (
    <>
    <div className = "addSongHeader"> Add a Song</div>
      
      <div className="addSong">
        <form>
          <InputFields 
          type="text" 
          placeholder="Song" 
          value={songInfo.name} 
          labelName="Song Name: "/>
        <InputFields 
          type="text" 
          placeholder="Artist" 
          value={songInfo.artist} 
          labelName="Artist: "/>
          <InputFields 
          type="text" 
          placeholder="Album" 
          value={songInfo.album} 
          labelName="Album: "/>
          <InputFields 
          type="text" 
          placeholder="Duration(min:s)" 
          value={songInfo.duration} 
          labelName="Duration: "/>
        </form>
      </div>
    </>
  );
}

export default AddSong;
