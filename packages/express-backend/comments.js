import mongoose from "mongoose";
import User from "./user.js";
import Playlist from "./playlist.js";


const userSchema = new mongoose.Schema(
 {
   comment: {
     type: String,
     required: true,
     trim: true,
   },
   userId: {
     //type: mongoose.Schema.Types.ObjectId,
     //ref: "User",
     type: String,
     required: true
   }
 },


 { collection: "comment_list" }
);


const Comment = mongoose.model("Comment", userSchema);
export default Comment;


