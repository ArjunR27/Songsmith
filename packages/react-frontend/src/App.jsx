// App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header.jsx'; 
import './App.css'; 
import Home from './pages/Home.jsx';
import Songs from './pages/Songs.jsx';
import Playlists from './pages/Playlists.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header /> {/*Header component */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/playlists" element={<Playlists />} />
          <Route exact path="/songs" element={<Songs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

