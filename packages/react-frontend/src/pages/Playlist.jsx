import { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import "./Playlist.css";
import { useLocation } from "react-router-dom";
import SongsTable from "../components/SongsTable";
import EditPlaylist from "../components/EditPlaylist";
import Comments from "../components/Comments";

function Playlist({ userId }) {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [playlist, setPlaylist] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [showEdit, setShowEdit] = useState(false);
  const [authorUsername, setAuthorUsername] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [playlistUpdated, setPlaylistUpdated] = useState(false);

  const fetchPlaylist = useCallback(() => {
    return fetch(`https://songsmith.azurewebsites.net/playlists/${path}`)
      .then((res) => res.json())
      .then((json) => {
        let pl = json["playlist_list"];

        console.log(pl);
        setPlaylist(pl);
        setLikesCount(pl.likes.length);
        setDislikesCount(pl.dislikes.length);
        return pl;
      });
  }, [path]);

  const handlePlaylistUpdate = (updatedPlaylist) => {
    setPlaylist(updatedPlaylist);
  };

  useEffect(() => {
    fetchPlaylist()
      .then((playlistData) => {
        if (playlistData && playlistData["author"]) {
          return fetch(`https://songsmith.azurewebsites.net/users/${playlistData["author"]}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
        return Promise.reject("No author found");
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        return response.json();
      })
      .then((user) => {
        setAuthorUsername(user["username"]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [fetchPlaylist, playlistUpdated]);

  const handleLike = async () => {
    try {
      const response = await fetch(`https://songsmith.azurewebsites.net/playlists/${path}/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userId }),
      });
      if (response.ok) {
        const likeData = await response.json();
        if (likeData) {
          setLikesCount(likeData.length);
          setPlaylist((prevPlaylist) => ({
            ...prevPlaylist,
            likes: likeData,
          }));
        } else {
          console.error('Response does not contain likes:', likeData);
        }
      } else {
        console.error('Failed to like playlist');
      }
    } catch (error) {
      console.error('Error liking playlist:', error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await fetch(`https://songsmith.azurewebsites.net/playlists/${path}/dislikes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userId }),
      });
      if (response.ok) {
        const dislikeData = await response.json();
        if (dislikeData) {
          setDislikesCount(dislikeData.length);
          setPlaylist((prevPlaylist) => ({
            ...prevPlaylist,
            dislikes: dislikeData,
          }));
        } else {
          console.error('Response does not contain dislikes:', dislikeData);
        }
      } else {
        console.error('Failed to dislike playlist');
      }
    } catch (error) {
      console.error('Error disliking playlist:', error);
    }
  };

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };

  function AddDelSong() {
    const [song, setSong] = useState("");
  
    const handleInputChange = (event) => {
      setSong(event.target.value);
    };
  
    const handleAddSong = () => {
      if (song === "") {
        setMessage(`Song not provided.`);
        setIsSuccess(false);
        return;
      } 
      fetch(`https://songsmith.azurewebsites.net/playlists/${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: song }),
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(data => {
              throw new Error(data.message || 'Failed to add song');
            });
          }
          return response.json();
        })
        .then((newPlaylist) => {
          setPlaylist(newPlaylist);
          setMessage(`Successfully added ${song} to playlist`);
          setIsSuccess(true);
          setPlaylistUpdated(!playlistUpdated); 
        })
        .catch((error) => {
          setMessage(`${error.message}`);
          setIsSuccess(false);
        });
  
      setSong("");
    };
  
    const handleDeleteSong = () => {
      if (song === "") {
        setMessage(`Song not provided.`);
        setIsSuccess(false);
        return;
      }
      fetch(`https://songsmith.azurewebsites.net/playlists/${path}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: song }),
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(data => {
              throw new Error(data.message || 'Failed to add song.');
            });
          }
          return response.json();
        })
        .then((newPlaylist) => {
          setPlaylist(newPlaylist);
          setMessage(`Successfully deleted ${song} from playlist.`);
          setIsSuccess(true);
          setPlaylistUpdated(!playlistUpdated); // Toggle state to trigger useEffect
        })
        .catch((error) => {
          setMessage(`${error.message}`);
          setIsSuccess(false);
        });
  
      setSong("");
    };

    return (
      <>
        <div className="pl-add-song">
          <input
            id="song-input"
            name="song-input"
            placeholder="Song"
            className="pl-song-input"
            value={song}
            onChange={handleInputChange}
          />
          <button onClick={handleAddSong} className="pl-song-button">
            Add Song
          </button>
          <button onClick={handleDeleteSong} className="pl-song-button">
            Delete Song
          </button>
        </div>
        <div className={`song-message ${isSuccess ? 'success' : 'error'}`}>
          {message}
        </div>
      </>
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
          <div className="pl-author">{authorUsername}</div>
          <div className="pl-desc">{playlist["description"]}</div>
          <div className="pl-toolbar">
            <div className="pl-buttons">
              <button onClick={handleLike}>
                Likes: {likesCount}
              </button>
              <button onClick={handleDislike}>
                Dislikes: {dislikesCount}
              </button>
              <button
                onClick={toggleComments}
                style={{ cursor: "pointer" }}>
                Comments
              </button>
              {playlist["author"] === userId &&
                <button onClick={toggleEdit} className="pl-edit-button">
                  Edit Playlist
                </button>}
            </div>
          </div>
          {playlist["author"] === userId && <AddDelSong />}
        </div>
        {showEdit && (
          <EditPlaylist
            playlist={playlist}
            onClose={() => setShowEdit(false)}
            onUpdate={handlePlaylistUpdate}
          />
        )}
      </div>

      <div className="pl-table">
        {showComments ? (
          <Comments comments={playlist["comments"]} userId={userId} />
        ) : (
          <SongsTable songData={playlist["songs"]} />
        )}
      </div>
    </div>
  );
}

Playlist.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default Playlist;
