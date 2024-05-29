import PropTypes from "prop-types";
import "./PlaylistBox.css";
import { Link } from "react-router-dom";

export default function PlaylistBox({ playlist }) {
  console.log(playlist._id);
  return (
    <div>
      <div className="playlist-box">
        <img
            src={playlist.cover ? playlist.cover : "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEyL2xyL21vbnoxNzU2NjItaW1hZ2UuanBn.jpg"}
            alt="Playlist cover"
            style={{ width: "300px", height: "300px" }}
        />      
        <div className="playlist-name">
          <Link className="playlist-name" to={"/playlists/" + playlist._id}>
            {" "}
            {playlist.playlist_name}
          </Link>
        </div>

        <div className="playlist-desc"> {playlist.description} </div>
      </div>
    </div>
  );
}

// Add PropTypes validation
PlaylistBox.propTypes = {
  playlist: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    cover: PropTypes.string,
    playlist_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
