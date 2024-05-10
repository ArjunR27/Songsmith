import React from 'react';
import './Header.css'; 

function Header() {
  return (
    <header className="header">
      <div className="left-container">
        <div className="logo-container">
          <div className="logo kumar-one-font">Songsmith</div>
        </div>
        <button className="menu-icon" aria-label="Menu">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </button>
      </div>
    </header>
  );
}

export default Header;
