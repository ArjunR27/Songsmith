import mongoose from "mongoose";
import userModel from "./packages/express-backend/user-services.js";
import User from "./packages/express-backend/user.js";
import Playlist from "./packages/express-backend/playlist.js";

import { jest } from "@jest/globals";

const testDataPrefix = "__test__";

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/mylocaldb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("User Model Tests", () => {
  afterEach(async () => {
    await User.deleteMany();
    await Playlist.deleteMany();
  });

  test("Add a user", async () => {
    const user = {
      username: `${testDataPrefix}testUser`,
      password: "password123",
    };
    const addedUser = await userModel.addUser(user);
    expect(addedUser.username).toBe(user.username);
  });

  test("Find a user by ID", async () => {
    const user = {
      username: `${testDataPrefix}testUser`,
      password: "password123",
    };
    const addedUser = await userModel.addUser(user);

    // Call the findUserById function
    const foundUser = await userModel.findUserById(addedUser._id);

    // Assert that the found user matches the added user
    expect(foundUser.username).toBe(user.username);
  });

  test("Find users by name when calling getUsers with a username", async () => {
    const user1 = { username: `${testDataPrefix}user1`, password: "password1" };
    const user2 = { username: `${testDataPrefix}user2`, password: "password2" };
    await userModel.addUser(user1);
    await userModel.addUser(user2);

    // Call getUsers with a specific username
    const foundUsers = await userModel.getUsers(`${testDataPrefix}user1`);

    // Assert that the found users match the expected username
    expect(foundUsers.length).toBe(1);
    expect(foundUsers[0].username).toBe(user1.username);
  });

  test("Get all users when calling getUsers without a username", async () => {
    // Add some users
    const users = [
      { username: `${testDataPrefix}user1`, password: "password1" },
      { username: `${testDataPrefix}user2`, password: "password2" },
    ];
    await Promise.all(users.map(userModel.addUser));

    const allUsers = await userModel.getUsers();

    expect(allUsers.length).toBe(users.length);
    users.forEach((user) => {
      expect(allUsers.some((u) => u.username === user.username)).toBe(true);
    });
  });

  test("Get playlists for user", async () => {
    const user = {
      username: `${testDataPrefix}testUser`,
      password: "password123",
    };
    const addedUser = await userModel.addUser(user);

    const playlists = [];
    for (let i = 0; i < 2; i++) {
      const playlist = new Playlist({
        playlist_name: `Playlist ${i + 1}`,
        description: `Description for Playlist ${i + 1}`,
      });
      await playlist.save();
      playlists.push(playlist._id.toString());
    }

    addedUser.playlists = playlists;
    await addedUser.save();

    const userPlaylists = await userModel.getPlaylistsForUser(addedUser._id);

    expect(userPlaylists).toBeDefined();
    expect(userPlaylists.playlists.length).toBe(playlists.length);
    userPlaylists.playlists.forEach((playlist) => {
      expect(playlists.includes(playlist._id.toString())).toBe(true);
    });
  });
});
