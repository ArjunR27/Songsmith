import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Playlist.css";
import { useLocation } from "react-router-dom";
import SongsTable from "../components/SongsTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import Comments from "../components/Comments.jsx";
import Comment from "../components/Comment.jsx";

function Playlist() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [playlist, setPlaylist] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(0);
  
  function fetchPlaylist() {
    const promise = fetch("http://localhost:8000/playlists/" + path);
    return promise;
  }

  useEffect(() => {
    fetchPlaylist()
      .then((res) => res.json())
      .then((json) => {
        setPlaylist(json["playlist_list"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  function PlaylistSongs(props) {
    console.log(props.songData);
    if (props.songData) {
      return <SongsTable songData={props.songData} />;
    } else {
      return <SongsTable songData={{}} />;
    }
  }

  function AddSong() {
    const [song, setSong] = useState("");

    const handleInputChange = (event) => {
      setSong(event.target.value);
    };

    const handleAddSong = () => {
      console.log("Adding song:", song);

      fetch("http://localhost:8000/playlists/" + path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: song }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          fetchPlaylist()
            .then((res) => res.json())
            .then((json) => {
              setPlaylist(json["playlist_list"]);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      setSong("");
    };

    return (
      <div className="pl-add-song">
        <input
          placeholder="Song"
          className="pl-song-input"
          value={song}
          onChange={handleInputChange}
        />
        <button onClick={handleAddSong} className="pl-song-button">
          Add Song
        </button>
      </div>
    );
  }

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="playlist">
      <div className="pl-top">
        <div className="pl-image">
          <img
            src={
              playlist.cover
                ? playlist.cover
                : "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEyL2xyL21vbnoxNzU2NjItaW1hZ2UuanBn.jpg"
            }
            alt="Playlist Image"
          />
        </div>
        <div className="pl-info">
          <div className="pl-name">{playlist["playlist_name"]}</div>
          <div className="pl-desc">{playlist["description"]}</div>
          <div className="pl-toolbar">
            <div className="pl-buttons">
              <FontAwesomeIcon icon={faThumbsUp} onClick={handleLike} />
              {likes}
              <FontAwesomeIcon icon={faThumbsDown} onClick={handleDislike} />
              <FontAwesomeIcon
                icon={faComment}
                onClick={toggleComments}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <AddSong />
        </div>
      </div>

      <div className="pl-table">
      {showComments ? (
        <Comments />
      ) : (
        <SongsTable songData={playlist["songs"]} />
      )}
      </div>
    </div>
  );
}

export default Playlist;
