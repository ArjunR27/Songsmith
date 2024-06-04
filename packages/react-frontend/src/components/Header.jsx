import "./Header.css";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const INVALID_TOKEN = "INVALID_TOKEN";

function Header(props) {
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
        <button className="menu-icon" aria-label="Menu" >
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

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};