import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import songServices from "./song-services.js";
import playlistServices from "./playlist-services.js";
import userServices from "./user-services.js";
import commentsServices from "./comments-services.js";
import { registerUser, loginUser, authenticateUser } from "./auth.js";

dotenv.config();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at https://songsmith.azurewebsites.net`);
});

// Login and Register
app.post("/signup", registerUser);

app.post("/login", loginUser);

app.get("/auth", authenticateUser, (req, res) => {
  try {
    res.status(200).json({ message: "User is authenticated" });
  } catch (error) {
    res.status(400).json({ message: "User cannot be authenticated" });
  }
});

// Database
app.post("/users", async (req, res) => {
  console.log(req.body);
  const user = req.body;
  const savedUser = await userServices.addUser(user);
  if (savedUser) res.status(201).send(savedUser);
  else res.status(500).send();
});

app.get("/users/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await userServices.findUserById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found");
  else {
    res.send({ username: result["username"] });
  }
});

app.get("/songs", async (req, res) => {
  const song_name = req.query["name"];
  const artist_name = req.query["artist"];
  const result = await songServices.getSongs(song_name, artist_name);
  res.send({ song_list: result });
});

app.get("/playlists", async (req, res) => {
  try {
    const allPlaylists = await playlistServices.getAllPlaylists();
    if (!allPlaylists) {
      return res.status(404).send("Playlists not found");
    }
    res.send({ playlist_list: allPlaylists });
  } catch (error) {
    console.error(error);
    res.status(500).send("error fetching playlists");
  }
});

app.get("/playlists/:id", async (req, res) => {
  try {
    const playlistId = req.params["id"];
    const result = await playlistServices.getPlaylistById(playlistId);
    if (result == undefined || result == null)
      res.status(404).send("Resource not found");
    else {
      res.send({ playlist_list: result });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching playlists");
  }
});

app.get("/playlists/:id/comments", async (req, res) => {
  try {
    const playlistId = req.params["id"];
    const result = await playlistServices.getPlaylistById(playlistId);
    if (result == undefined || result == null)
      res.status(404).send("Resource not found");
    else {
      res.send({ comment_list: result.comments });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching playlists");
  }
});

app.get("/playlists/:id/likes", async (req, res) => {
  try {
    const playlistId = req.params["id"];
    const result = await playlistServices.getPlaylistById(playlistId);
    if (result == undefined || result == null)
      res.status(404).send("Resource not found");
    else {
      res.send({ like_list: result.likes });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching playlists");
  }
});

app.get("/playlists/:id/dislikes", async (req, res) => {
  try {
    const playlistId = req.params["id"];
    const result = await playlistServices.getPlaylistById(playlistId);
    if (result == undefined || result == null)
      res.status(404).send("Resource not found");
    else {
      res.send({ dislike_list: result.dislikes });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching playlists");
  }
});

app.post("/playlists/:id", async (req, res) => {
  try {
    const playlistId = req.params["id"];
    const songInput = req.body;

    const result = await playlistServices.getPlaylistById(playlistId);

    const song = await songServices.getSongs(songInput["name"]);
    if (song.length == 0 || song == undefined) {
      return res
        .status(404)
        .json({ message: `Could not find song ${songInput["name"]}.` });
    }
    await result.addSong(song[0]["_id"]);

    res.send(await playlistServices.getPlaylistById(playlistId));
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching playlists");
  }
});

app.delete("/playlists/:id", async (req, res) => {
  try {
    const playlistId = req.params["id"];
    const songInput = req.body;
    const result = await playlistServices.getPlaylistById(playlistId);
    const song = await songServices.getSongs(songInput["name"]);
    // Song doesn't exist
    if (song.length == 0 || song == undefined) {
      return res
        .status(404)
        .json({ message: `Could not find song ${songInput["name"]}.` });
    }

    await result.deleteSong(song[0]["_id"]);
    res.send(await playlistServices.getPlaylistById(playlistId));
  } catch (error) {
    if (error.message !== "Song not found") {
      console.error(error);
      return res.status(500).send("Error deleting song from playlist.");
    }

    // Song is not in playlist
    return res
      .status(404)
      .json({ message: `Song ${req.body["name"]} is not in the playlist.` });
  }
});

app.post("/songs", async (req, res) => {
  try {
    const songAddition = req.body;
    const result = await songServices.addSong(songAddition);
    if (result) {
      res.status(201).send(result);
    } else {
      res.status(500).send({ error: "Failed to add song" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post("/playlists", async (req, res) => {
  try {
    const playlist = req.body;
    console.log(req.body);
    const result = await playlistServices.createPlaylist(playlist);
    if (result) res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ error: error.mesage });
  }
});

app.post("/playlists/:id/comments", async (req, res) => {
  try {
    const playlistId = req.params["id"];
    const commentInput = req.body;

    if (!commentInput) {
      return res.status(500).send({ error: error.message });
    }
    const playlist = await playlistServices.getPlaylistById(playlistId);
    if (!playlist) {
      return res.status(500).send({ error: error.message });
    }

    const newComment = await commentsServices.createComment(commentInput);
    await playlist.addComment(newComment._id);
    res.status(201).send(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching playlists");
  }
});

app.post("/playlists/:id/likes", async (req, res) => {
  try {
    const playlistId = req.params["id"];
    const userId = req.body.user;

    const playlist = await playlistServices.getPlaylistById(playlistId);
    if (!playlist) {
      return res.status(500).send({ error: error.message });
    }

    await playlist.addLike(userId);

    res.status(200).send(playlist.likes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching playlists");
  }
});

app.post("/playlists/:id/dislikes", async (req, res) => {
  try {
    const playlistId = req.params["id"];
    const userId = req.body.user;

    const playlist = await playlistServices.getPlaylistById(playlistId);
    if (!playlist) {
      return res.status(500).send({ error: error.message });
    }

    await playlist.addDislike(userId);

    res.status(200).send(playlist.dislikes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching playlists");
  }
});

app.put("/playlists/:id", async (req, res) => {
  try {
    const playlistId = req.params["id"];
    const newDetails = req.body;

    const playlist = await playlistServices.getPlaylistById(playlistId);
    if (!playlist) {
      return res.status(500).send({ error: error.message });
    }

    await playlist.editPlaylist(newDetails);
    res.send({ message: "Playlist updated", playlist });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching playlists");
  }
});
