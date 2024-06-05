import mongoose from "mongoose";
import songModel from "./packages/express-backend/song-services.js";
import Song from "./packages/express-backend/song.js";






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


describe("Song Model Tests", () => {
   afterEach(async () => {
       await Song.deleteMany({ name: { $regex: `^${testDataPrefix}` }});
   });


   test("Add a song", async () => {
       const song = { name: `${testDataPrefix}testSong`,
                      artist: "artist",
                      album: "album",
                      duration: 3.5,
                      image_link: "link.com" };
       const addedSong = await songModel.addSong(song);
       expect(addedSong.name).toBe(song.name);
   });


   test("Adding song error", async () => {
       const song = { name: `${testDataPrefix}testSong` };
       await expect(songModel.addSong(song)).rejects.toThrow();
   });
  
   test("Find song by name", async () => {
       const song = { name: `${testDataPrefix}testSong2`,
                      artist: "artist",
                      album: "album",
                      duration: 3.5,
                      image_link: "link.com" };
       const addedSong = await songModel.addSong(song);
       const foundSong = await songModel.findSongByName(addedSong.name);
       expect(foundSong).not.toBeNull();
   });


   test("Find song by artist", async () => {
       const songs = [
           { name: `${testDataPrefix}testSong3`,
           artist: "artist",
           album: "album",
           duration: 3.5,
           image_link: "link.com" },


           { name: `${testDataPrefix}testSong4`,
           artist: "artist",
           album: "album",
           duration: 3.5,
           image_link: "link.com" },


       ]
       await Promise.all(songs.map(songModel.addSong));
       const foundSongs = await songModel.findSongsByArtist(songs[0].artist);
       expect(foundSongs.length).toBe(2)
   });


   test("Get songs by name", async () => {
       const songs = [
           { name: `${testDataPrefix}testSong7`,
           artist: "artist1",
           album: "album1",
           duration: 3.5,
           image_link: "link.com" },
  
           { name: `${testDataPrefix}testSong8`,
           artist: "artist2",
           album: "album2",
           duration: 4.2,
           image_link: "link2.com" },
       ];
       await Promise.all(songs.map(songModel.addSong));
  
       // Retrieve songs by name
       const foundSongs = await songModel.getSongs(`${testDataPrefix}testSong7`);
  
       // Check if the correct song was retrieved
       expect(foundSongs.length).toBe(1);
       expect(foundSongs[0].name).toBe(`${testDataPrefix}testSong7`);
   });




   test("Get songs by artist", async () => {
       const songs = [
           { name: `${testDataPrefix}testSong9`,
           artist: "artist3",
           album: "album3",
           duration: 3.5,
           image_link: "link.com" },
  
           { name: `${testDataPrefix}testSong10`,
           artist: "artist3",
           album: "album4",
           duration: 4.2,
           image_link: "link2.com" },
       ];
       await Promise.all(songs.map(songModel.addSong));
  
       // Retrieve songs by artist
       const foundSongs = await songModel.getSongs(null, "artist3");
  
       // Check if the correct songs were retrieved
       expect(foundSongs.length).toBe(2);
       expect(foundSongs.every(song => song.artist === "artist3")).toBe(true);
   });
  


   test("Get all songs", async () => {
       // Add some test songs
       const songs = [
           { name: `${testDataPrefix}testSong5`,
           artist: "artist1",
           album: "album1",
           duration: 3.5,
           image_link: "link.com" },


           { name: `${testDataPrefix}testSong6`,
           artist: "artist2",
           album: "album2",
           duration: 4.2,
           image_link: "link2.com" },
       ];
       await Promise.all(songs.map(songModel.addSong));


       // Retrieve all songs
       const allSongs = await songModel.getSongs();
      
       // Check if all songs were retrieved
       expect(allSongs.length).toBe(songs.length);
   });
});
