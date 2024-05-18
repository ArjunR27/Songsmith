
import React, {useState, useEffect} from "react"
import Table from "../components/SongsTable.jsx"
import './Songs.css'


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
            <div className="songs">
                <h1 className ="song-header">Songs</h1>   
                <div className="table-container">
                    <Table songData={songs} />
                </div>
            </div>  
            
        </>    
    )
}

export default Songs;