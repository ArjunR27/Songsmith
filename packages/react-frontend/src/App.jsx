import { BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home.jsx";
import Songs from "./pages/Songs.jsx";
import Playlists from "./pages/Playlists.jsx";
import Playlist from "./pages/Playlist.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Sidebar from "./components/SideBar";
import React from "react";
import CreateSong from "./pages/CreateSong.jsx";
import Header from "./components/Header.jsx";
import CreatePlaylist from "./pages/CreatePlaylist.jsx";

function AppContent() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup";

  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(localStorage.getItem("authToken") || INVALID_TOKEN);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const API_PREFIX = "http://localhost:8000";
  
    function checkAuthentication() {
      fetch(`${API_PREFIX}/auth`, {
        method: "GET",
        headers: addAuthHeader(),
      })
        .then((response) => {
          if (response.status === 200) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        })
        .catch((error) => {
          setIsAuthenticated(false);
          console.log("Authentication check error:", error);
        });
    }


  function addAuthHeader(otherHeaders = {}) {
    if (token === INVALID_TOKEN) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`,
      };
    }
  }
  
    useEffect(() => {
      if (token !== INVALID_TOKEN) {
        checkAuthentication();
      }
    }, [token]);

  return (
    <>
      {!hideSidebar && <Sidebar />}
      <Header isAuthenticated={isAuthenticated}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login isAuthenticated={isAuthenticated} setToken={setToken}/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlists/:id" element={<Playlist />} />
        <Route path="/createPlaylist" element={<CreatePlaylist />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/createSong" element={<CreateSong />} />
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
