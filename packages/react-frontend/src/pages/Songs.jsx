
import React, {useState} from "react"
import '../App.css'
import Table from "./SongsTable.jsx"
//import "./Home.css"

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
        }
    ]);

    return (
        <>
            <div className="App">
                Songs
                    
                

                <Table 
                    songData={songs} 
                />
            </div> 
        </>

    )
}

export default Songs;