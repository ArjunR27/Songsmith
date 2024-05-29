import dotenv from "dotenv";
import mongoose from "mongoose";
import userModel from "./user.js";

dotenv.config();
const uri = process.env.MONGODB_URI;
mongoose.set("debug", true);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
}

function getUsers() {
  let promise;
  try {
    promise = userModel.find();
    return promise;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
}

function getPlaylistsForUser(id) {
  return userModel.findById(id).populate("playlists");
}

export default {
  getUsers,
  findUserById,
  addUser,
  getPlaylistsForUser,
};
