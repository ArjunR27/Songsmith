import {React, useState, useEffect} from "react"
import "./Playlists.css"
import PlaylistMap from "../components/PlaylistMap.jsx"

export default function Playlists() {
    const [playlists, setPlaylists] = useState([]);

    function fetchPlaylists() {
        const promise = fetch("http://localhost:8000/playlists");
        return promise;
    }

    useEffect(() => {   
        fetchPlaylists()
        .then((res) => res.json())
        .then((json) => setPlaylists(json["playlist_list"]))
        .catch((error) => { console.log(error); });
    }, [] );

    console.log(playlists);
    return (
        <>
            <div className="playlists">
                <h1>Playlists</h1>
                <div className = "tools">
                    <p>Search for Playlists</p>
                    <p>Add Songs</p>
                    
                </div>
                <PlaylistMap playlistsData = {playlists}/>
                
            </div>
        </>
    )
}