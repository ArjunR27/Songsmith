import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";
import Songs from "./pages/Songs.jsx";
import Playlists from "./pages/Playlists.jsx";
import Sidebar from "./components/SideBar";
import React from "react";
import Header from "./components/Header.jsx";
import CreatePlaylist from "./pages/CreatePlaylist.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/playlists" element={<Playlists />} />
          <Route exact path="/playlists/new" element={<CreatePlaylist />} />
          <Route exact path="/songs" element={<Songs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
