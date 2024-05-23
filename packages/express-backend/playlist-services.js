import mongoose from "mongoose";
import dotenv from "dotenv"
import playlistModel from "./playlist.js";

dotenv.config();

mongoose.set("debug", true);
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    })
    .catch((error) => console.log(error));

function getAllPlaylists() {
    let promise; 
    try {
        promise = playlistModel.find().populate('songs');
        return promise; 
    } catch (error) {
        throw new Error(`Error fetching playlists: ${error.message}`)
    }
}

function getPlaylistById(id) {
    let promise; 
    try {
        promise = playlistModel.findById(id).populate('songs');
        return promise
    } catch (error) {
        throw new Error(`Error fetching playlists: ${error.message}`)
    }
}

function createPlaylist(playlist) {
    try {
        const playlistToAdd = new playlistModel(playlist);
        const promise = playlistToAdd.save()
        return promise
    } catch (error) {
        throw new Error(`Error creating playlist: ${error.message}`)
    }
}
    




export default {
    getAllPlaylists,
    createPlaylist,
    getPlaylistById,
}
