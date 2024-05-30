import dotenv from "dotenv";
import mongoose from "mongoose";
import userModel from "./user.js";
import commentModel from "./comments.js";


dotenv.config();
const uri = process.env.MONGODB_URI;
mongoose.set("debug", true);
mongoose
 .connect(uri, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
 })
 .catch((error) => console.log(error));


function addComment(comment) {
 try{
    const comToAdd = new commentModel(comment);
    const promise = comToAdd.save();
    return promise;
 } catch (error) {
    throw new Error(`Error creating playlist: ${error.message}`)
 }
}

function getAllCommentsByPlaylistId(playlistId) {
   let promise;
   try {
     promise = commentModel.find({playlistId: playlistId}).exec();
     return promise;
   } catch (error) {
     throw new Error(`Error fetching playlists: ${error.message}`);
   }
 }


export default {addComment, getAllCommentsByPlaylistId};
