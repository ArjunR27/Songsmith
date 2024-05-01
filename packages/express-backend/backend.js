// backend.js
import express from "express";
import cors from "cors";
import songServices from "./song-services.js"

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


app.get("/songs", async (req, res) => {
  const song_name = req.query["name"];
  const result = await songServices.getSongs(song_name)
  res.send({ song_list : result })
});