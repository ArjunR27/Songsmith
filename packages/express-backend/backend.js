// backend.js
import express from "express";
import cors from "cors";
import songServices from "./song-services.js";
import playlistServices from "./playlist-services.js";
import userServices from "./user-services.js";
import { registerUser, loginUser, authenticateUser } from "./auth.js";


const app = express();
const port = 8000;



app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Login and Register
app.post("/signup", registerUser);

app.post("/login", loginUser);

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
    res.send({ users_list: result });
  }
});

app.get("/users", async (req, res) => {
  const users = await userServices.getUsers();
  res.send({ user_list: users });
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

app.post("/playlists/:id", async (req, res) => {
  try {
    const playlistId = req.params["id"];
    const songInput = req.body;

    const result = await playlistServices.getPlaylistById(playlistId)

    const song = await songServices.getSongs(songInput["name"]);
    await result.addSong(song[0]["_id"]);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching playlists")
  }

});

app.post("/songs", async (req, res) => {
  try {
    const songAddition = req.body;
    const result = await songServices.addSong(songAddition);
    if (result) {
      res.status(201).send(result); // Send the result if successful
    } else {
      res.status(500).send({ error: "Failed to add song" }); // Handle the error case appropriately
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post("/playlists", async (req, res) => {
  try {
    const playlist = req.body;
    console.log(req.body)
    const result = await playlistServices.createPlaylist(playlist);
    if (result) res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ error: error.mesage });
  }
});
