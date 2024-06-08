import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import songModel from "./song.js";

dotenv.config();
mongoose.set("debug", true);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error}`);
  });

async function addSong(song) {
  console.log(song);
  try {
    const songToAdd = new songModel({
      name: song.name,
      artist: song.artist,
      album: song.album,
      duration: song.duration,
      image_link: song.image_link,
    });
    console.log(songToAdd);
    const savedSong = await songToAdd.save();
    return savedSong;
  } catch (error) {
    throw new Error(`Error adding song`);
  }
}

function findSongByName(name) {
  return songModel.find({ name: name });
}

function findSongsByArtist(artist) {
  return songModel.find({ artist: artist });
}

function getSongs(name, artist) {
  let promise;
  if (name === undefined && artist === undefined) {
    promise = songModel.find();
  } else if (name && !artist) {
    promise = findSongByName(name);
  } else {
    promise = findSongsByArtist(artist);
  }
  return promise;
}

export default {
  getSongs,
  findSongByName,
  findSongsByArtist,
  addSong,
};
