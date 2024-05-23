import React, { useState } from "react";
import "./Header.css";
import SideBar from "./SideBar.jsx";

function Header() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <header className="header">
      <div className="left-container">
        <div className="logo-container">
          <div className="logo kumar-one-font">Songsmith</div>
        </div>
        <button className="menu-icon" aria-label="Menu" onClick={toggleSidebar}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </button>
      </div>
      <SideBar isOpen={isSideBarOpen} />
    </header>
  );
}

export default Header;
