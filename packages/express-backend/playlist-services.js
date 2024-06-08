import mongoose from "mongoose";
import dotenv from "dotenv";
import playlistModel from "./playlist.js";

dotenv.config();

mongoose.set("debug", true);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getAllPlaylists() {
  let promise;
  promise = playlistModel
    .find()
    .populate("songs")
    .populate("comments")
    .populate("likes")
    .populate("dislikes")
    .exec();
  return promise;
}

function createPlaylist(playlist) {
  const playlistToAdd = new playlistModel(playlist);
  const promise = playlistToAdd.save();
  return promise;
}

export default { getAllPlaylists, createPlaylist };
