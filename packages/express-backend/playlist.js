import mongoose from "mongoose";
import Song from "./song.js";
import Comment from "./comments.js";

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

    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    dislikes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { collection: "playlist_list" },
);

playlistSchema.methods.addSong = async function (songId) {
  try {
    const song = await Song.findById(songId);
    if (!song) {
      throw new Error("Song not found");
    }

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

playlistSchema.methods.deleteSong = async function (songId) {
  try {
    const songIndex = this.songs.findIndex((s) => s.equals(songId));
    if (songIndex === -1) {
      throw new Error("Song not found");
    }
    this.songs.splice(songIndex, 1);
    this.save();

    return this;
  } catch (error) {
    throw new Error(`Error deleting song: ${error.message}`);
  }
};

playlistSchema.methods.addComment = async function (commentId) {
  try {
    this.comments.push(commentId);
    this.save();

    return this;
  } catch (error) {
    throw new Error(`Error adding comment: ${error.message}`);
  }
};

playlistSchema.methods.addLike = async function (userId) {
  try {
    const existingLikeIndex = this.likes.findIndex(
      (item) => item && item._id && item._id.toString() === userId.toString(),
    );
    const existingDislikeIndex = this.dislikes.findIndex(
      (item) => item && item._id && item._id.toString() === userId.toString(),
    );

    if (existingLikeIndex !== -1) {
      this.likes.splice(existingLikeIndex, 1);
    } else if (existingDislikeIndex !== -1) {
      this.dislikes.splice(existingDislikeIndex, 1);
      this.likes.push(userId);
    } else {
      this.likes.push(userId);
    }

    await this.save();

    return this;
  } catch (error) {
    throw new Error(`Error adding like: ${error.message}`);
  }
};

playlistSchema.methods.addDislike = async function (userId) {
  try {
    const existingDislikeIndex = this.dislikes.findIndex(
      (dislike) => dislike && dislike._id && dislike._id.equals(userId),
    );
    const existingLikeIndex = this.likes.findIndex(
      (like) => like && like._id && like._id.equals(userId),
    );

    if (existingDislikeIndex !== -1) {
      this.dislikes.splice(existingDislikeIndex, 1);
    } else if (existingLikeIndex !== -1) {
      this.likes.splice(existingLikeIndex, 1);
      this.dislikes.push(userId);
    } else {
      this.dislikes.push(userId);
    }

    await this.save();

    return this;
  } catch (error) {
    throw new Error(`Error adding dislike: ${error.message}`);
  }
};

playlistSchema.methods.editPlaylist = async function (newInfo) {
  try {
    if (newInfo.playlist_name) {
      this.playlist_name = newInfo.playlist_name;
    }
    if (newInfo.description) {
      this.description = newInfo.description;
    }
    if (newInfo.cover) {
      this.cover = newInfo.cover;
    }
    await this.save();
    return this;
  } catch (error) {
    throw new Error(`Error updating playlist: ${error.message}`);
  }
};

const Playlist = mongoose.model("Playlist", playlistSchema);
export default Playlist;
