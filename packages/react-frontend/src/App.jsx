
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home.jsx"
import Songs from "./pages/Songs.jsx"
import Playlists from "./pages/Playlists.jsx"
import Playlist from "./pages/Playlist.jsx"
import Sidebar from './components/SideBar'
import React from 'react'
import Header from './components/Header.jsx'

function App() {
  return (
    <div className="App">
       <BrowserRouter>    
          <Sidebar />
          <Header />       
            <Routes>
                <Route exact path="/" element={<Home />}>
                </Route>
                <Route exact path="/playlists" element={<Playlists/>}>
                </Route>
                <Route exact path="/playlists/:id" element={<Playlist />} >
                </Route>
                <Route exact path="/songs" element={<Songs />}>
                </Route>
            </Routes>
        </BrowserRouter>
         
    </div>
    
  )

}

export default App;

