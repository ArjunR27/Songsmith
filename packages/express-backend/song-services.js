import mongoose from "mongoose";
import fs from "fs";
import songModel from "./song.js";

mongoose.set("debug", true);

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/songs", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    // Read JSON file
    const jsonData = fs.readFileSync("./songs.json");
    const songsData = JSON.parse(jsonData);

    // Iterate over each song data
    for (const songData of songsData) {
        try {
            // Check if the song already exists in the database
            const existingSong = await songModel.findOne({
                name: songData.track_name,
                artist: songData.artist_name,
                album: songData.album_name
            });

            // If the song doesn't exist, create and save a new Song document
            if (!existingSong) {
                const song = new songModel({
                    name: songData.track_name,
                    artist: songData.artist_name,
                    album: songData.album_name,
                    duration: songData.track_duration_min,
                    image_link: songData.album_image_url
                });
                await song.save();
            }
        } catch (error) {
            console.error(`Error adding song to the database: ${error}`);
        }
    }
}).catch((error) => {
    console.error(`Error connecting to MongoDB: ${error}`);
});

function findSongByName(name) {
    return songModel.find({ name : name });
}

function findSongsByArtist(artist) {
    return songModel.find({ artist : artist });
}

function getSongs(name, artist) {
    let promise;
    if (name === undefined && artist === undefined) {
        promise = songModel.find();
    }
    else if (name && !artist) {
        promise = findSongByName(name);
    }
    else {
        promise = findSongsByArtist(artist);
    }
    return promise; 
}

export default {
    getSongs,
}
