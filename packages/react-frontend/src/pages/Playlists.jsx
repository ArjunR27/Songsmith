import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Playlists.css";
import PlaylistMap from "../components/PlaylistMap.jsx";



export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("songsmith.azurewebsites.net/playlists");
        if (!response.ok) {
          throw new Error("Failed to fetch playlists");
        }
        const json = await response.json();
        setPlaylists(json.playlist_list);
      } catch (error) {
        console.error("Error fetching playlists:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.playlist_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="page">
      <h1>Playlists</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="search for playlists"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Link to="/createPlaylist">
          <button>Create Playlist</button>
        </Link>
      </div>
      <PlaylistMap playlistsData={filteredPlaylists} />
    </div>
  );
}
