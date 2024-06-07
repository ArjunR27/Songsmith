import mongoose from "mongoose";
import playlistModel from "./packages/express-backend/playlist-services.js";
import Playlist from "./packages/express-backend/playlist.js";
import Song from "./packages/express-backend/song.js";
import songModel from "./packages/express-backend/song-services.js";
import Comment from "./packages/express-backend/comments.js";
import commentModel from "./packages/express-backend/comments-services.js";
import { jest } from "@jest/globals";

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/mylocaldb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await Playlist.deleteMany();
  await Song.deleteMany();
  await Comment.deleteMany();
  await mongoose.disconnect();
});

describe("Playlist Model Tests", () => {
  afterEach(async () => {
    await Playlist.deleteMany();
    await Comment.deleteMany();
    await Song.deleteMany();
  });

  test("Create Playlist", async () => {
    const playlistToAdd = {
      playlist_name: "test_playlist",
      description: "test descriptions",
      cover: "test cover",
      author: new mongoose.Types.ObjectId(),
      songs: [],
      comments: [],
      likes: [],
      dislikes: [],
    };
    const addedPlaylist = await playlistModel.createPlaylist(playlistToAdd);
    expect(addedPlaylist.playlist_name).toBe(playlistToAdd.playlist_name);
  });

  test("Error creating playlist", async () => {
    const playlistToAdd = {};
    await expect(playlistModel.createPlaylist(playlistToAdd)).rejects.toThrow();
  });

  test("Get playlist by id", async () => {
    const playlistToAdd = {
      playlist_name: "test_playlist",
      description: "test descriptions",
      cover: "test cover",
      author: new mongoose.Types.ObjectId(),
      songs: [],
      comments: [],
      likes: [],
      dislikes: [],
    };
    const addedPlaylist = await playlistModel.createPlaylist(playlistToAdd);
    const returnedPlaylist = await playlistModel.getPlaylistById(
      addedPlaylist._id,
    );
    expect(returnedPlaylist.playlist_name).toBe(playlistToAdd.playlist_name);
  });

  test("Get playlist by id error", async () => {
    const invalidId = "invalid_id"; // Provide an invalid ID
    await expect(playlistModel.getPlaylistById(invalidId)).rejects.toThrow();
  });

  test("Get all playlists", async () => {
    const playlistToAdd = {
      playlist_name: "test_playlist",
      description: "test descriptions",
      cover: "test cover",
      author: new mongoose.Types.ObjectId(),
      songs: [],
      comments: [],
      likes: [],
      dislikes: [],
    };

    const playlistToAdd2 = {
      playlist_name: "test_playlist",
      description: "test descriptions",
      cover: "test cover",
      author: new mongoose.Types.ObjectId(),
      songs: [],
      comments: [],
      likes: [],
      dislikes: [],
    };

    await playlistModel.createPlaylist(playlistToAdd);
    await playlistModel.createPlaylist(playlistToAdd2);
    const playlists = await playlistModel.getAllPlaylists();
    expect(playlists.length).toBe(2);
  });

  test("Add song to playlist", async () => {
    const playlistToAdd = {
      playlist_name: "test_playlist",
      description: "test descriptions",
      cover: "test cover",
      author: new mongoose.Types.ObjectId(),
      songs: [],
      comments: [],
      likes: [],
      dislikes: [],
    };

    const addedPlaylist = await playlistModel.createPlaylist(playlistToAdd);

    const song = {
      name: "testSong",
      artist: "artist",
      album: "album",
      duration: 3.5,
      image_link: "link.com",
    };

    const addedSong = await songModel.addSong(song);
    await addedPlaylist.addSong(addedSong._id);
    expect(addedPlaylist.songs.length).toBe(1);
  });
});
