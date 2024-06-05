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

function findUserByName(username) {
  return userModel.find({ username: username });
}

function getUsers(username) {
  let promise;
  if (username === undefined) {
    promise = userModel.find();
  } else {
    promise = findUserByName(username);
  }
  return promise;
}

function getPlaylistsForUser(id) {
  return userModel.findById(id).populate("playlists");
}

export default {
  getUsers,
  findUserById,
  findUserByName,
  addUser,
  getPlaylistsForUser,
};
