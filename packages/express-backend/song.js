import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: true,
            trim: true,
        },

        artist: {
            type: String,
            required: true, 
            trim: true, 
        },

        album: {
            type: String,
            required: true,
            trim: true,
        },

        duration: {
            type: Number,
            required: true,
        },
        
        image_link: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { collection: "song_list" }
);

const Song = mongoose.model("Song", songSchema);
export default Song