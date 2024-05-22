import React from "react";
import "./CreateSong.css";
import { useState } from "react";
import InputFields from "../components/inputFields";

function CreateSong() {
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [duration, setDuration] = useState("");
  const [songImg, setImg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const songInfo = { name, artist, album, duration, songImg };
    console.log("Song Info:", songInfo);

    try {
      const response = await fetch("http://localhost:8000/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(songInfo),
      });
      if (!response.ok) {
        throw new Error("Failed to add song");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <div className="addSongHeader"> Add a Song</div>
      <div className="addSong">
        <form onSubmit={handleSubmit}>
          <InputFields
            type="text"
            placeholder="Song"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            labelName="Song Name: "
          />
          <InputFields
            type="text"
            placeholder="Artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            id="Artist"
            labelName="Artist: "
          />
          <InputFields
            type="text"
            placeholder="Album"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            id="Album"
            labelName="Album: "
          />
          <InputFields
            type="number"
            placeholder="Duration(min.s)"
            value={duration}
            onChange={(e) => setDuration(parseFloat(e.target.value))}
            id="Duration"
            labelName="Duration: "
          />
          <InputFields
            type="text"
            placeholder="Image url"
            value={songImg}
            onChange={(e) => setImg(e.target.value)}
            id="Img"
            labelName="Song Cover: "
          />
          <button
            type="submit"
            style={{
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "900px",
              cursor: "pointer",
              fontSize: "20px",
              marginTop: "50px",
            }}
          >
            Submit!
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateSong;
