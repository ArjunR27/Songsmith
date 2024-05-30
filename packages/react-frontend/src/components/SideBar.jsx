import React, { useState } from "react";
import "./SideBar.css"; // Import CSS for styling
//import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/songs">
            Songs
          </Link>
        </li>
        <li>
          <Link to="/playlists">
            Playlists
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
