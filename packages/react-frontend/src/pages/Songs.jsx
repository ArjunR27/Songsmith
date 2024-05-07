
import React, {useState} from "react"
import Table from "./SongsTable.jsx"
import './Songs.css'

function MenuBar() {
    return (
        <div className="menu-bar">
            <h1>Menu</h1> 

            <h3>Songs</h3>
            <h3>Playlists</h3>
   
        </div>
    );
}

function Songs() {
    const [songs, setSongs] = useState([
        {
            "track_name": "Fortnight (feat. Post Malone)",
            "artist_name": "Taylor Swift",
            "album_name": "THE TORTURED POETS DEPARTMENT",
            "track_duration_min": 3.8160833333333333,
            "album_image_url": "https://i.scdn.co/image/ab67616d0000b2735076e4160d018e378f488c33"
        },
        {
            "track_name": "Feather",
            "artist_name": "Sabrina Carpenter",
            "album_name": "emails i can\u2019t send fwd:",
            "track_duration_min": 3.0925333333333334,
            "album_image_url": "https://i.scdn.co/image/ab67616d0000b2730f45623be014a592a5815827"
        },
        {
            "track_name": "love is embarrassing",
            "artist_name": "Olivia Rodrigo",
            "album_name": "GUTS",
            "track_duration_min": 2.575266666666667,
            "album_image_url": "https://i.scdn.co/image/ab67616d0000b273e85259a1cae29a8d91f2093d"
        },
        {
            "track_name": "honey",
            "artist_name": "Coastal Club",
            "album_name": "honey",
            "track_duration_min": 4.171783333333333,
            "album_image_url": "https://i.scdn.co/image/ab67616d0000b273b02938092a02e50652ebab2e"
        },
        {
            "track_name": "Good Luck, Babe!",
            "artist_name": "Chappell Roan",
            "album_name": "Good Luck, Babe!",
            "track_duration_min": 3.6403833333333333,
            "album_image_url": "https://i.scdn.co/image/ab67616d0000b27391b4bc7c88d91a42e0f3a8b7"
        },
        {
            "track_name": "Read your Mind",
            "artist_name": "Sabrina Carpenter",
            "album_name": "emails i can't send",
            "track_duration_min": 3.46415,
            "album_image_url": "https://i.scdn.co/image/ab67616d0000b273700f7bf79c9f063ad0362bdf"
        },
        {
            "track_name": "all-american bitch",
            "artist_name": "Olivia Rodrigo",
            "album_name": "GUTS (spilled)",
            "track_duration_min": 2.7638833333333332,
            "album_image_url": "https://i.scdn.co/image/ab67616d0000b2734063d624ebf8ff67bc3701ee"
        },
        {
            "track_name": "the way things go",
            "artist_name": "beabadoobee",
            "album_name": "the way things go",
            "track_duration_min": 3.13,
            "album_image_url": "https://i.scdn.co/image/ab67616d0000b2739c835164f2d56dae7ee8a402"
        },
        {
            "track_name": "End of Beginning",
            "artist_name": "Djo",
            "album_name": "DECIDE",
            "track_duration_min": 2.6540833333333333,
            "album_image_url": "https://i.scdn.co/image/ab67616d0000b273fddfffec51b4580acae727c1"
        },
    ]);

    return (
        <>
            <div className="navTop"> 
                <h1>Songsmith</h1>
            </div>
                
            <div className="table-container">
                <Table songData={songs} />
            </div>

            <MenuBar></MenuBar>
        </>
        
            
          
  

    )
}

export default Songs;