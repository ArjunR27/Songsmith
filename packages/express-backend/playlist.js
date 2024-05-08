import mongoose from "mongoose"
import Song from "./song.js"

const playlistSchema = new mongoose.Schema(
    { 
        
        playlist_name: {
            type: String,
            required: true,
            trim: true,
        }, 

        description: {
            type: String,
            trim: true,
        },

        songs: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song'
        }]
    }
);

const Playlist = mongoose.model("Playlist", playlistSchema);
export default Playlist