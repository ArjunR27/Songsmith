import { useState, useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const INVALID_TOKEN = "INVALID_TOKEN";

function Header() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const logoutUser = () => {
    localStorage.setItem("authToken", INVALID_TOKEN);
    window.location.reload();
  }


  
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
      <div className="right-container">
        <Link to="/login">
            Login
        </Link>
        <Link to="/signup">
            Signup
        </Link>
        <Link to="/login"> 
          <button onClick={logoutUser}>Logout</button>
          </Link>
      </div>
    </header>
  );
}

export default Header;
