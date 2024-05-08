import mongoose from "mongoose"
import userModel from "./user.js"

mongoose.set("debug", true);



function addUser(user) {
    const userToAdd = new userModel(user)
    const promise = userToAdd.save();
    return promise
}

function findUserById(id) {
    return userModel.findById(id);
}

function getUsers() {
    let promise;
    try {
        promise = userModel.find()
        return promise
    } catch (error) {
        throw new Error(`Error fetching users: ${error.message}`)
    }
}

// Need a function that will show the playlists for each user
// I think the path is /:id/playlists

export default {
    getUsers,
    findUserById,
    addUser,
}
