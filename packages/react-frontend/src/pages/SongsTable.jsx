
function TableHeader() {
    return (
        <thead>
            <tr>
            <th>Track Name</th>
            <th>Artist Name</th>
            <th>Album Name</th>
            <th>Track Duration</th>
            <th>Album Image</th>
            </tr>
        </thead>
    );
  }

function convertMins(mins) {
    const message = `${Math.floor(mins / 1)} mins ${Math.floor((mins % 1) * 60)} secs`;
    return message;
} 
function TableBody(props) {
    const rows = props.songData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.track_name}</td>
                <td>{row.artist_name}</td>
                <td>{row.album_name}</td>
                <td>{convertMins(row.track_duration_min)}</td>
                <td><img src={row.album_image_url} alt="Album Image" style={{ width: '100px', height: '100px' }} /></td>
                
            </tr>
        );
    });
    return (
        <tbody>
            {rows}

        </tbody>
    );

}

function Table(props) {
    return (
        <table>
            <TableHeader/>
            <TableBody
                songData={props.songData}
            />
            
        </table>
        
    );
}

export default Table;