
import React from 'react'
import "./PlaylistBox.css"
import { Link } from "react-router-dom";

export default function PlaylistBox({playlist}) {
    console.log(playlist._id);
    return (
        <div>
            <div className="playlist-box">
                <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEyL2xyL21vbnoxNzU2NjItaW1hZ2UuanBn.jpg" alt="Image" style={{ width: '300px', height: '300px' }} />
                <div className="playlist-name">
                    <Link className="playlist-name" to={"/playlists/" + playlist._id}> {playlist.playlist_name}</Link>
                </div>
                
                <div className="playlist-desc"> {playlist.description} </div>
            </div>
        </div>
            
    )
}

;