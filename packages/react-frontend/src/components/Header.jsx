import { useState, useEffect } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

const INVALID_TOKEN = "INVALID_TOKEN";

function Header(props) {
  const navigate = useNavigate();
  const [logoutTrigger, setLogoutTrigger] = useState(false);

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const logoutUser = () => { 
    localStorage.setItem("authToken", INVALID_TOKEN);
    window.location.href = "/";
  }

  function HeaderRight(props) {
    if (props.isAuthenticated)
      return (
        <div className="right-container">
            <button onClick={logoutUser}>Logout</button>
        </div>
      );
    else {
      return (
        <div className="right-container">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      );
    }
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
      <HeaderRight isAuthenticated={props.isAuthenticated}/>
      
    </header>
  );
  
  
}

export default Header;
