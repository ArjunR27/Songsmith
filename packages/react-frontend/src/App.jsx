import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import Home from "./pages/Home.jsx";
import Songs from "./pages/Songs.jsx";
import Playlists from "./pages/Playlists.jsx";
import Playlist from "./pages/Playlist.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Sidebar from './components/SideBar';
import React from 'react';
import Header from './components/Header.jsx';

function AppContent() {
  const location = useLocation();
  const hideHeaderAndSidebar = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideHeaderAndSidebar && <Sidebar />}
      {!hideHeaderAndSidebar && <Header />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/playlists" element={<Playlists />} />
        <Route exact path="/playlists/:id" element={<Playlist />} />
        <Route exact path="/songs" element={<Songs />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

export default App;
