import mongoose from "mongoose";
import Song from "./song.js";

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

    cover: {
      type: String,
      trim: true,
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    likes: [
      {
        user:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        liked: {
          type: Boolean,
          default: false
        } 
      }
    ]
  },
  { collection: "playlist_list" },
);

playlistSchema.methods.addSong = async function (songId) {
  try {
    // Look up the song by ID to ensure it exists
    const song = await Song.findById(songId);
    if (!song) {
      throw new Error("Song not found");
    }

    // Add the song to the playlist if it's not already in the list
    if (this.songs.some((s) => s.equals(songId))) {
      throw new Error("Song already exists in the playlist");
    }

    this.songs.push(songId);
    this.save();

    return this;
  } catch (error) {
    throw new Error(`Error adding song: ${error.message}`);
  }
};

const Playlist = mongoose.model("Playlist", playlistSchema);
export default Playlist;
