import { useState, useEffect, useCallback} from "react";
import "./Playlist.css";
import { useLocation } from "react-router-dom";
import SongsTable from "../components/SongsTable";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faThumbsUp, faThumbsDown,faComment} from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types'; // Import PropTypes
import EditPlaylist from "../components/EditPlaylist"
import Comments from "../components/Comments"


function Playlist() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [playlist, setPlaylist] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [showEdit, setShowEdit] = useState(false);



  const fetchPlaylist = useCallback(() => {
    return fetch("https://songsmith.azurewebsites.net/playlists/" + path);
  }, [path]);

  Playlist.propTypes = {
    songData: PropTypes.array // Update the prop type as per your data structure
  };

  useEffect(() => {
    fetchPlaylist()
      .then((res) => res.json())
      .then((json) => {
        setPlaylist(json["playlist_list"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fetchPlaylist]);

  
  const handleLike = async () => {
    try{
      const response = await fetch('https://songsmith.azurewebsites.net/playlists/' + path + "/likes",{
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: "6658efd0fec8498cec5f9380" }),
        });
        if (response.ok) {
          setLikes(likes + 1);
        } else {
          console.error('Failed to like playlist');
        } 
      } catch (error) {
        console.error('Error liking playlist:', error);
      }
      
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };

 

  function AddSong() {
    const [song, setSong] = useState("");

    const handleInputChange = (event) => {
      setSong(event.target.value);
    };

    const handleAddSong = () => {
        console.log('Adding song:', song);
        
        fetch("https://songsmith.azurewebsites.net/playlists/" + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: song }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            fetchPlaylist()
              .then(res => res.json())
              .then(json => {
                setPlaylist(json["playlist_list"]);
              })
              .catch(error => {
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
              <button onClick={handleLike}>
                Likes: {likes}
              </button> 
              <button onClick={handleDislike}>
                Dislikes: {dislikes}
              </button> 
              <button
                onClick={toggleComments}
                style={{ cursor: "pointer" }}>
                Comments
                </button>
              
              <button onClick={toggleEdit} className="pl-edit-button">
                Edit Playlist
              </button>{" "}
              {/* Edit Playlist button */}
            </div>
          </div>
          <AddSong />
        </div>
        {showEdit && (
          <EditPlaylist
            playlist={playlist}
            onClose={() => setShowEdit(false)}
          />
        )}
      </div>

      <div className="pl-table">
        {showComments ? (
          <Comments comments = {playlist["comments"]}/>
        ) : (
          <SongsTable songData={playlist["songs"]} />
        )}
      </div>
    </div>
  );
}

export default Playlist;
