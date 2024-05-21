
import PlaylistBox from "./PlaylistBox.jsx"
import "./PlaylistMap.css"


export default function PlaylistsMap({playlistsData}) {
    if (!playlistsData || playlistsData.length === 0) {
        return (
            <div className="playlist-map">
                <p>No playlists available</p>
            </div>
        );
    }

    return (
        <div className="playlist-map">
            {playlistsData.map((playlist, index) => (
                <PlaylistBox key={index} playlist={playlist} />
            ))}
        </div>
    );
}
