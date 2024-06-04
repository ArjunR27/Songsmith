import dotenv from "dotenv";
import mongoose from "mongoose";
import userModel from "./user.js";
import commentModel from "./comments.js";
import playlistModel from "./playlist.js";

dotenv.config();
const uri = process.env.MONGODB_URI;
mongoose.set("debug", true);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function createComment(comment) {
  try {
    const comToAdd = new commentModel(comment);
    const promise = comToAdd.save();
    return promise;
  } catch (error) {
    throw new Error(`Error creating playlist: ${error.message}`);
  }
}

export default { createComment };
