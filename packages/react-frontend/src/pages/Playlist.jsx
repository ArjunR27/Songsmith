import { useState, useEffect, useCallback} from "react";
import "./Playlist.css";
import { useLocation } from "react-router-dom";
import SongsTable from "../components/SongsTable";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faThumbsUp, faThumbsDown,faComment} from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types'; // Import PropTypes

function Playlist() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [playlist, setPlaylist] = useState([]);
  

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

  function PlaylistSongs(props) {
    console.log(props.songData);
    if (props.songData) {
      return <SongsTable songData={props.songData} />;
    } else {
      return <SongsTable songData={{}} />;
    }
  }

  function AddSong() {
    const [song, setSong] = useState('');

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
            console.error('Error:', error);
        });
    
        setSong('');
    };

    return (
        <div className="pl-add-song">
            <input 
                placeholder="Song" 
                className="pl-song-input"
                value={song}
                onChange={handleInputChange}
            />
            <button onClick={handleAddSong} className="pl-song-button">Add Song</button>
        </div>
    );

    
  }

  return (
    <div className="playlist">
      <div className="pl-top">
        <div className="pl-image">
          <img
            src={playlist.cover ? playlist.cover : "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEyL2xyL21vbnoxNzU2NjItaW1hZ2UuanBn.jpg"}
            alt="Playlist Image"
          />
        </div>
        <div className="pl-info">
          <div className="pl-name">{playlist["playlist_name"]}</div>
          <div className="pl-desc">{playlist["description"]}</div>
          <div className="pl-toolbar">
            <div className="pl-buttons">
                    Like
                    Dislike
                    Comment
                </div>
          </div>
            <AddSong/>
        </div>
      </div>
     
      <div className="pl-table">
        <PlaylistSongs songData={playlist["songs"]} />
      </div>
    </div>
  );
}

export default Playlist;
