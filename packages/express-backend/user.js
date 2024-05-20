import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            trim: true,    
        },

        playlists: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Playlist'
        }]
        
    },
    
    { collection : "user_list" }
);

const User = mongoose.model("User", userSchema)
export default User