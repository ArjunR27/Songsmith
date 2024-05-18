import { React, useState, useEffect } from 'react';
import "./Playlist.css"
import { useLocation } from "react-router-dom";
import SongsTable from "../components/SongsTable"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComment } from '@fortawesome/free-solid-svg-icons';


function Playlist() {
    const location = useLocation();
    const path = location.pathname.split("/")[2]; 
    const [playlist, setPlaylist] = useState([]);


     // FETCH Users
    function fetchPlaylist() {
        const promise = fetch("http://localhost:8000/playlists/" + path);
        return promise;
    }

    useEffect(() => {   
        fetchPlaylist()
        .then((res) => res.json())
        .then((json) => {setPlaylist(json["playlist_list"]);})
        .catch((error) => { console.log(error); })
    }, [] );



    
    function PlaylistSongs(props) {
        console.log(props.songData);
        if (props.songData) {
            return (
                <SongsTable songData={props.songData}> </SongsTable>
            );
        } else {
            return (
                <SongsTable songData={{}}> </SongsTable>
            );
        }
    }
    
    if (playlist) {
        return (
            <>                
                <div className="playlist">
                    <div className="pl-top">
                        <div className="pl-image">
                            <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEyL2xyL21vbnoxNzU2NjItaW1hZ2UuanBn.jpg" alt="Image" />
                        </div>
                        <div className="pl-info">
                            <div className="pl-name">{playlist["playlist_name"]}</div>
                            <div className="pl-desc">{playlist["description"]}</div>
                            <div className="pl-buttons">
                                <FontAwesomeIcon icon={faThumbsUp} /> 
                                <FontAwesomeIcon icon={faThumbsDown} /> 
                                <FontAwesomeIcon icon={faComment} />
                                
                            </div>
                        </div>
                    </div>
                    <div className="pl-table">
                        <PlaylistSongs songData={playlist["songs"]}></PlaylistSongs>
                    </div>
                </div>
            </>    
        )
    } else {
        return (
            <>                
                <div className="playlist">
                    Playlist not found.
                </div>  
            </>    
        )
    }
    
}

export default Playlist;