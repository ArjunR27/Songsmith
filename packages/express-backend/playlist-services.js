import mongoose from "mongoose";
import playlistModel from "./playlist.js";

mongoose.set("debug", true);

function getAllPlaylists() {
    let promise; 
    try {
        promise = playlistModel.find().populate('songs');
        return promise; 
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
}
