// backend.js
import express from "express";
import cors from "cors";
import songServices from "./song-services.js"
import playlistServices from "./playlist-services.js";
import userServices from "./user-services.js"
import User from "./user.js";

const app = express();
const port = 8000;

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

app.post("/users", async (req, res) => {
  console.log(req.body);
  const user = req.body;
  const savedUser = await userServices.addUser(user);
  if (savedUser) res.status(201).send(savedUser)
  else res.status(500).send();
})

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
  const users = await userServices.getUsers()
  res.send({ user_list : users })
})


app.get("/songs", async (req, res) => {  
  const song_name = req.query["name"];
  const artist_name = req.query["artist"]
  const result = await songServices.getSongs(song_name, artist_name)
  res.send({ song_list : result })
});

app.get("/users/:id/playlists", async (req, res) => {
  try {
    const userId = req.params["id"];
    const user = await userServices.findUserById(userId).populate('playlists');

    if (!user) {
      return res.status(404).send("User not found");
    }

    for (let playlist of user.playlists) {
      await playlist.populate('songs');
    }

    res.send({ playlist_list: user.playlists });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching playlists");
  }
});


app.post("/playlists", async (req, res) => {
    const playlist = req.body;
    const savedPlaylist = await playlistServices.createPlaylist(playlist)
    if (savedPlaylist) res.status(201).send(savedPlaylist);
    else res.status(500).send();
});