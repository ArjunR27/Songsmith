import React, { useState } from 'react';
import './SideBar.css'; // Import CSS for styling
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
      <ul>
        <li><Link to ="/songs" style = {{color: '#fff'}}>Songs</Link></li>
        <li><Link to ="/playlists" style = {{color: '#fff'}}>Playlists</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;