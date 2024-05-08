import React from "react"
import "./Playlists.css"
import PlaylistMap from "../components/PlaylistMap.jsx"

export default function Playlists() {
    //const [playlists, setPlaylists] = useState([]);

    /*
    function fetchPlaylists() {
        const promise = fetch("http://localhost:8000/playlists");
        return promise;
    }

    useEffect(() => {   
        fetchPlaylists()
        .then((res) => res.json())
        .then((json) => setPlaylists(json["playlists_lists"]))
        .catch((error) => { console.log(error); });
    }, [] );
    */

    return (
        <>
            <div className="playlists">
                <h1>Playlists</h1>
                <div>
                    Search for Playlists
                    Add Songs
                </div>
                <PlaylistMap/>
                
            </div>
        </>
    )
}