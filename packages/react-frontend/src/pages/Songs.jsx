
import React, {useState, useEffect} from "react"
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
    const [songs, setSongs] = useState([]);

     // FETCH Users
    function fetchUsers() {
        const promise = fetch("http://localhost:8000/songs");
        
        return promise;
    }

    useEffect(() => {   
        fetchUsers()
        .then((res) => res.json())
        .then((json) => setSongs(json["song_list"]))
        .catch((error) => { console.log(error); });
    }, [] );

    return (
        <>
            <div className="navTop"> 
                <h1>Songsmith</h1>
            </div>
                
            <div className="table-container">
                <Table songData={songs} />
            </div>

      
        </>
        
            
          
  

    )
}

export default Songs;