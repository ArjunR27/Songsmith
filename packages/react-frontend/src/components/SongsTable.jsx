import PropTypes from "prop-types"; // Add PropTypes import
import "./SongsTable.css";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>#</th>
        <th>Album Image</th>
        <th>Track Name</th>
        <th>Artist Name</th>
        <th>Album Name</th>
        <th>Track Duration</th>
      </tr>
    </thead>
  );
}

function convertMins(mins) {
  const message = `${Math.floor(mins / 1)} mins ${Math.floor(
    (mins % 1) * 60
  )} secs`;
  return message;
}

function TableBody(props) {
  if (!props || !Array.isArray(props.songData)) {
    return <tbody></tbody>;
  }
  const rows = props.songData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{1 + index}</td>
        <td>
          <img
            src={row.image_link}
            alt="Album Image"
            style={{ width: "100px", height: "100px" }}
          />
        </td>
        <td> {row.name}</td>
        <td>{row.artist}</td>
        <td>{row.album}</td>
        <td>{convertMins(row.duration)}</td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

// Add PropTypes validation for TableBody component
TableBody.propTypes = {
  songData: PropTypes.arrayOf(
    PropTypes.shape({
      image_link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      album: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
    })
  ),
};

function Table(props) {
  return (
    <>
      <table className="song-table">
        <TableHeader />
        <TableBody songData={props.songData} />
      </table>
    </>
  );
}

// Add PropTypes validation for Table component
Table.propTypes = {
  songData: PropTypes.arrayOf(
    PropTypes.shape({
      image_link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      album: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
    })
  ),
};

export default Table;
