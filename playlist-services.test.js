import mongoose from "mongoose";
import playlistModel from "./packages/express-backend/playlist-services.js";
import Playlist from "./packages/express-backend/playlist.js";
import Song from "./packages/express-backend/song.js";
import songModel from "./packages/express-backend/song-services.js";
import Comment from "./packages/express-backend/comments.js";
import commentModel from "./packages/express-backend/comments-services.js";
import userModel from "./packages/express-backend/user-services.js";
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

  test("should throw an error if song not found", async () => {
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
    const playlist = await playlistModel.createPlaylist(playlistToAdd);

    const nonExistentSongId = new mongoose.Types.ObjectId();

    // Assert that the function throws the expected error
    await expect(playlist.addSong(nonExistentSongId)).rejects.toThrow(
      "Error adding song: Song not found",
    );
  });

  test("should throw an error if song already exists in the playlist", async () => {
    const songToAdd = {
      name: `testSong:D`,
      artist: "artist3",
      album: "album3",
      duration: 3.5,
      image_link: "link.com",
    };
    const song = await songModel.addSong(songToAdd);

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
    const playlist = await playlistModel.createPlaylist(playlistToAdd);

    await playlist.addSong(song.id);

    await expect(playlist.addSong(song.id)).rejects.toThrow(
      "Error adding song: Song already exists in the playlist",
    );
  });

  test("should throw an error if save fails when adding song", async () => {
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
    const playlist = await playlistModel.createPlaylist(playlistToAdd);

    const songId = new mongoose.Types.ObjectId();

    // Mock the save method to throw an error
    jest.spyOn(playlist, "save").mockImplementationOnce(() => {
      throw new Error("Save failed");
    });

    // Assert that the function throws the expected error
    await expect(playlist.addSong(songId)).rejects.toThrow(
      "Error adding song: Song not found",
    );

    // Restore the original implementation
    playlist.save.mockRestore();
  });

  test("should remove a song successfully", async () => {
    const songId = new mongoose.Types.ObjectId();

    const playlistToAdd = {
      playlist_name: "test_playlist",
      description: "test descriptions",
      cover: "test cover",
      author: new mongoose.Types.ObjectId(),
      songs: [songId],
      comments: [],
      likes: [],
      dislikes: [],
    };

    const playlist = await playlistModel.createPlaylist(playlistToAdd);

    const updatedPlaylist = await playlist.deleteSong(songId);

    expect(updatedPlaylist.songs).toHaveLength(0);
  });

  test("should throw an error if song not found in playlist", async () => {
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

    const playlist = await playlistModel.createPlaylist(playlistToAdd);

    const nonExistentSongId = new mongoose.Types.ObjectId();

    // Assert that the function throws the expected error
    await expect(playlist.deleteSong(nonExistentSongId)).rejects.toThrow(
      "Song not found",
    );
  });

  test("should throw an error if save fails when deleting song", async () => {
    const songId = new mongoose.Types.ObjectId();
    const playlistToAdd = {
      playlist_name: "test_playlist",
      description: "test descriptions",
      cover: "test cover",
      author: new mongoose.Types.ObjectId(),
      songs: [songId],
      comments: [],
      likes: [],
      dislikes: [],
    };

    const playlist = await playlistModel.createPlaylist(playlistToAdd);

    jest.spyOn(playlist, "save").mockImplementationOnce(() => {
      throw new Error("Save failed");
    });

    // Assert that the function throws the expected error
    await expect(playlist.deleteSong(songId)).rejects.toThrow("Song not found");

    // Restore the original implementation
    playlist.save.mockRestore();
  });

  test("Add a like successfully", async () => {
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
    const playlist = await playlistModel.createPlaylist(playlistToAdd);

    const userToAdd = {
      username: `testUser`,
      password: "password123",
    };
    const user = await userModel.addUser(userToAdd);

    const updatedPlaylist = await playlist.addLike(user._id);

    expect(updatedPlaylist.likes).toHaveLength(1);
    expect(updatedPlaylist.likes[0]._id.toString()).toBe(user._id.toString());
    expect(updatedPlaylist.dislikes).toHaveLength(0);
  });

  test("Remove a like successfully if already liked", async () => {
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
    const playlist = await playlistModel.createPlaylist(playlistToAdd);

    const userToAdd = {
      username: `testUser`,
      password: "password123",
    };
    const user = await userModel.addUser(userToAdd);

    await playlist.addLike(user._id);

    const updatedPlaylist = await playlist.addLike(user._id); // Remove like

    expect(updatedPlaylist.likes).toHaveLength(0);
    expect(updatedPlaylist.dislikes).toHaveLength(0);
  });

  test("Add a dislike successfully", async () => {
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
    const playlist = await playlistModel.createPlaylist(playlistToAdd);

    const userToAdd = {
      username: `testUser`,
      password: "password123",
    };
    const user = await userModel.addUser(userToAdd);

    const updatedPlaylist = await playlist.addDislike(user._id);

    expect(updatedPlaylist.dislikes).toHaveLength(1);
    expect(updatedPlaylist.dislikes[0]._id.toString()).toBe(
      user._id.toString(),
    );
    expect(updatedPlaylist.likes).toHaveLength(0);
  });

  test("Remove a dislike successfully if already disliked", async () => {
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

    const playlist = await playlistModel.createPlaylist(playlistToAdd);

    const userToAdd = {
      username: `testUser`,
      password: "password123",
    };
    const user = await userModel.addUser(userToAdd);

    await playlist.addDislike(user._id);
    const updatedPlaylist = await playlist.addDislike(user._id);

    expect(updatedPlaylist.dislikes).toHaveLength(0);
    expect(updatedPlaylist.likes).toHaveLength(0);
  });

  test("Switch from like to dislike", async () => {
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
    const playlist = await playlistModel.createPlaylist(playlistToAdd);

    const userToAdd = {
      username: `testUser`,
      password: "password123",
    };
    const user = await userModel.addUser(userToAdd);

    await playlist.addLike(user._id);
    const updatedPlaylist = await playlist.addDislike(user._id);

    expect(updatedPlaylist.likes).toHaveLength(0);
    expect(updatedPlaylist.dislikes).toHaveLength(1);
    expect(updatedPlaylist.dislikes[0]._id.toString()).toBe(
      user._id.toString(),
    );
  });

  test("Switch from dislike to like", async () => {
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

    const playlist = await playlistModel.createPlaylist(playlistToAdd);

    const userToAdd = {
      username: `testUser`,
      password: "password123",
    };
    const user = await userModel.addUser(userToAdd);

    await playlist.addDislike(user._id);
    const updatedPlaylist = await playlist.addLike(user._id);

    expect(updatedPlaylist.dislikes).toHaveLength(0);
    expect(updatedPlaylist.likes).toHaveLength(1);
    expect(updatedPlaylist.likes[0]._id.toString()).toBe(user._id.toString());
  });

  test("should edit the playlist successfully", async () => {
    const oldInfo = {
      playlist_name: "Name",
      description: "Description",
      cover: "Cover.jpg",
      author: new mongoose.Types.ObjectId(),
    };

    const newInfo = {
      playlist_name: "New Name",
      description: "New Description",
      cover: "new_cover.jpg",
      author: new mongoose.Types.ObjectId(),
    };

    const playlist = await playlistModel.createPlaylist(oldInfo);
    const updatedPlaylist = await playlist.editPlaylist(newInfo);

    expect(updatedPlaylist.playlist_name).toBe("New Name");
    expect(updatedPlaylist.description).toBe("New Description");
    expect(updatedPlaylist.cover).toBe("new_cover.jpg");
  });

  test("should edit the playlist name successfully", async () => {
    const oldInfo = {
      playlist_name: "Name",
      description: "Description",
      cover: "Cover.jpg",
      author: new mongoose.Types.ObjectId(),
    };

    const newInfo = {
      playlist_name: "New Name",
      author: new mongoose.Types.ObjectId(),
    };

    const playlist = await playlistModel.createPlaylist(oldInfo);
    const updatedPlaylist = await playlist.editPlaylist(newInfo);

    expect(updatedPlaylist.playlist_name).toBe("New Name");
  });

  test("should edit the playlist desc successfully", async () => {
    const oldInfo = {
      playlist_name: "Name",
      description: "Description",
      cover: "Cover.jpg",
      author: new mongoose.Types.ObjectId(),
    };

    const newInfo = {
      description: "New Description",
      author: new mongoose.Types.ObjectId(),
    };

    const playlist = await playlistModel.createPlaylist(oldInfo);
    const updatedPlaylist = await playlist.editPlaylist(newInfo);

    expect(updatedPlaylist.description).toBe("New Description");
  });

  test("should throw an error if save fails", async () => {
    const newInfo = {
      playlist_name: "Another New Name",
      description: "Another New Description",
      cover: "another_new_cover.jpg",
      author: new mongoose.Types.ObjectId(),
    };

    const playlist = await playlistModel.createPlaylist(newInfo);

    jest.spyOn(playlist, "save").mockImplementationOnce(() => {
      throw new Error("Save failed");
    });

    await expect(playlist.editPlaylist(newInfo)).rejects.toThrow(
      "Error updating playlist: Save failed",
    );

    playlist.save.mockRestore();
  });

  test("should add a comment successfully", async () => {
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

    const playlist = await playlistModel.createPlaylist(playlistToAdd);

    const commentId = new mongoose.Types.ObjectId();

    const updatedPlaylist = await playlist.addComment(commentId);

    expect(updatedPlaylist.comments).toHaveLength(1);
    expect(updatedPlaylist.comments[0].toString()).toBe(commentId.toString());
  });

  test("should throw an error if save fails when adding comment", async () => {
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

    const playlist = await playlistModel.createPlaylist(playlistToAdd);

    const commentId = new mongoose.Types.ObjectId();

    jest.spyOn(playlist, "save").mockImplementationOnce(() => {
      throw new Error("Save failed");
    });

    await expect(playlist.addComment(commentId)).rejects.toThrow(
      "Error adding comment: Save failed",
    );

    playlist.save.mockRestore();
  });

  test("error for add like", async () => {
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

    const playlist = await playlistModel.createPlaylist(playlistToAdd);

    const userId = new mongoose.Types.ObjectId();

    jest.spyOn(playlist, "save").mockImplementationOnce(() => {
      throw new Error("Save failed");
    });

    await expect(playlist.addLike(userId)).rejects.toThrow(
      "Error adding like: Save failed",
    );

    playlist.save.mockRestore();
  });

  test("error for add dislike", async () => {
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

    const playlist = await playlistModel.createPlaylist(playlistToAdd);

    const userId = new mongoose.Types.ObjectId();

    jest.spyOn(playlist, "save").mockImplementationOnce(() => {
      throw new Error("Save failed");
    });

    await expect(playlist.addDislike(userId)).rejects.toThrow(
      "Error adding dislike: Save failed",
    );

    playlist.save.mockRestore();
  });
});
